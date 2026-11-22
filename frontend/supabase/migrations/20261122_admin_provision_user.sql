
-- =============================================================================
-- IEEE RNSIT - Secure Administrator Provisioning RPC
-- Requires a confirmed Google OAuth account.
-- =============================================================================

BEGIN;

CREATE OR REPLACE FUNCTION public.admin_provision_user(
    p_email TEXT,
    p_role TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
    v_email TEXT;
    v_user_id UUID;
    v_email_confirmed_at TIMESTAMPTZ;
    v_existing_email TEXT;
    v_existing_user_id UUID;
    v_caller_id UUID;
BEGIN

    -- 1. Authenticate caller

    v_caller_id := auth.uid();

    IF v_caller_id IS NULL THEN
        RETURN pg_catalog.jsonb_build_object(
            'success', false,
            'code', 'UNAUTHENTICATED',
            'message', 'Authentication is required.'
        );
    END IF;

    -- 2. Verify active Super Admin

    IF NOT EXISTS (
        SELECT 1
        FROM public.admin_users AS au
        WHERE au.user_id = v_caller_id
          AND au.role = 'super_admin'
          AND au.is_active = TRUE
    ) THEN
        RETURN pg_catalog.jsonb_build_object(
            'success', false,
            'code', 'PERMISSION_DENIED',
            'message', 'Only active Super Admins can provision administrators.'
        );
    END IF;

    -- 3. Normalize and validate email

    v_email := pg_catalog.lower(pg_catalog.btrim(p_email));

    IF v_email IS NULL
       OR v_email = ''
       OR v_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    THEN
        RETURN pg_catalog.jsonb_build_object(
            'success', false,
            'code', 'VALIDATION_ERROR',
            'message', 'A valid email address is required.'
        );
    END IF;

    -- 4. Validate role

    IF p_role IS NULL
       OR p_role NOT IN ('super_admin', 'admin', 'editor')
    THEN
        RETURN pg_catalog.jsonb_build_object(
            'success', false,
            'code', 'VALIDATION_ERROR',
            'message', 'Invalid administrator role.'
        );
    END IF;

    -- 5. Serialize requests for the same email

    PERFORM pg_catalog.pg_advisory_xact_lock(
        pg_catalog.hashtextextended('admin_provision_' || v_email, 0)
    );

    -- 6. Find actual Auth user and confirmation status

    SELECT au.id, au.email_confirmed_at
    INTO v_user_id, v_email_confirmed_at
    FROM auth.users AS au
    WHERE pg_catalog.lower(au.email) = v_email
    LIMIT 1;

    IF v_user_id IS NULL THEN
        RETURN pg_catalog.jsonb_build_object(
            'success', false,
            'code', 'USER_NOT_IN_AUTH',
            'message', 'This user must sign in using Google before provisioning.'
        );
    END IF;

    -- 7. Require confirmed email

    IF v_email_confirmed_at IS NULL THEN
        RETURN pg_catalog.jsonb_build_object(
            'success', false,
            'code', 'GOOGLE_SIGN_IN_REQUIRED',
            'message', 'The user's email must be confirmed through Google sign-in.'
        );
    END IF;

    -- 8. Require a matching Google identity

    IF NOT EXISTS (
        SELECT 1
        FROM auth.identities AS ai
        WHERE ai.user_id = v_user_id
          AND ai.provider = 'google'
          AND pg_catalog.lower(ai.identity_data ->> 'email') = v_email
    ) THEN
        RETURN pg_catalog.jsonb_build_object(
            'success', false,
            'code', 'GOOGLE_SIGN_IN_REQUIRED',
            'message', 'The user must sign in using the matching Google account first.'
        );
    END IF;

    -- 9. Check UUID conflict

    SELECT au.email
    INTO v_existing_email
    FROM public.admin_users AS au
    WHERE au.user_id = v_user_id;

    IF FOUND THEN
        IF pg_catalog.lower(v_existing_email) <> v_email THEN
            RETURN pg_catalog.jsonb_build_object(
                'success', false,
                'code', 'ACCOUNT_CONFLICT',
                'message', 'This Auth account is already associated with a different administrator email.'
            );
        END IF;

        RETURN pg_catalog.jsonb_build_object(
            'success', false,
            'code', 'DUPLICATE_RECORD',
            'message', 'This user is already registered as an administrator.'
        );
    END IF;

    -- 10. Check email conflict

    SELECT au.user_id
    INTO v_existing_user_id
    FROM public.admin_users AS au
    WHERE pg_catalog.lower(au.email) = v_email;

    IF FOUND THEN
        RETURN pg_catalog.jsonb_build_object(
            'success', false,
            'code', 'ACCOUNT_CONFLICT',
            'message', 'This email is already associated with a different Auth account.'
        );
    END IF;

    -- 11. Insert administrator using actual Auth UUID

    INSERT INTO public.admin_users (
        user_id,
        email,
        role,
        is_active,
        created_at,
        created_by
    )
    VALUES (
        v_user_id,
        v_email,
        p_role,
        TRUE,
        pg_catalog.now(),
        v_caller_id
    );

    -- 12. Return success

    RETURN pg_catalog.jsonb_build_object(
        'success', true,
        'user_id', v_user_id,
        'email', v_email,
        'role', p_role,
        'is_active', TRUE,
        'created_by', v_caller_id
    );

END;
$function$;

-- 13. Set function owner

ALTER FUNCTION public.admin_provision_user(TEXT, TEXT)
OWNER TO postgres;

-- 14. Restrict function execution

REVOKE ALL ON FUNCTION public.admin_provision_user(TEXT, TEXT)
FROM PUBLIC, anon, service_role, authenticated;

GRANT EXECUTE ON FUNCTION public.admin_provision_user(TEXT, TEXT)
TO authenticated;

-- 15. Remove direct INSERT permission

REVOKE INSERT ON TABLE public.admin_users
FROM anon, authenticated, PUBLIC;

-- 16. Reload PostgREST schema cache

NOTIFY pgrst, 'reload schema';

COMMIT;

-- =============================================================================
-- VERIFICATION
-- =============================================================================

SELECT
    routine_name,
    routine_schema,
    security_type,
    data_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name = 'admin_provision_user';

SELECT
    pg_get_userbyid(p.proowner) AS function_owner,
    p.prosecdef AS security_definer,
    pg_get_function_arguments(p.oid) AS function_arguments
FROM pg_catalog.pg_proc AS p
JOIN pg_catalog.pg_namespace AS n
    ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND p.proname = 'admin_provision_user';

SELECT
    grantee,
    privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
  AND table_name = 'admin_users'
ORDER BY grantee, privilege_type;
