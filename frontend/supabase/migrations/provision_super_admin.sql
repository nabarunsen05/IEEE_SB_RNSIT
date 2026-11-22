
-- ==============================================================================
-- IEEE SB RNSIT - Initial Super Admin Provisioning
-- Target: Supabase PostgreSQL (Dashboard -> SQL Editor)
-- ==============================================================================

DO $$
DECLARE
  c_target_email CONSTANT TEXT :=
    LOWER(TRIM('ieeernsitstudentbranch@gmail.com'));

  v_user_id UUID;
  v_email_confirmed BOOLEAN := FALSE;
  v_has_matching_google_identity BOOLEAN := FALSE;
  v_existing_email_by_uid TEXT;
  v_existing_uid_by_email UUID;
  v_rows_affected INTEGER := 0;
BEGIN

  -- 1. Validate configured email

  IF c_target_email IS NULL
     OR c_target_email = ''
     OR c_target_email = 'replace_with_my_personal_gmail' THEN
    RAISE EXCEPTION
      'CONFIGURATION ERROR: Invalid configured email.';
  END IF;

  IF c_target_email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION
      'VALIDATION ERROR: "%" is not a valid email address.',
      c_target_email;
  END IF;

  -- 2. Verify account exists and email is confirmed

  SELECT
    au.id,
    (
      au.email_confirmed_at IS NOT NULL
      OR au.confirmed_at IS NOT NULL
    )
  INTO
    v_user_id,
    v_email_confirmed
  FROM auth.users AS au
  WHERE LOWER(au.email) = c_target_email
  LIMIT 1;

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION
      'USER NOT FOUND: "%" does not exist in auth.users. Sign in through Google OAuth first.',
      c_target_email;
  END IF;

  IF NOT v_email_confirmed THEN
    RAISE EXCEPTION
      'EMAIL UNCONFIRMED: Email "%" is not confirmed.',
      c_target_email;
  END IF;

  -- 3. Verify matching Google identity

  SELECT EXISTS (
    SELECT 1
    FROM auth.identities AS ai
    WHERE ai.user_id = v_user_id
      AND ai.provider = 'google'
      AND LOWER(ai.identity_data ->> 'email') = c_target_email
  )
  INTO v_has_matching_google_identity;

  IF NOT v_has_matching_google_identity THEN
    RAISE EXCEPTION
      'GOOGLE IDENTITY MISMATCH: User "%" (UUID: %) does not have a linked Google identity with the matching email.',
      c_target_email,
      v_user_id;
  END IF;

  -- 4. Lock existing matching administrator rows, if present

  PERFORM 1
  FROM public.admin_users
  WHERE user_id = v_user_id
     OR LOWER(email) = c_target_email
  FOR UPDATE;

  -- 5. Check UUID conflict

  SELECT email
  INTO v_existing_email_by_uid
  FROM public.admin_users
  WHERE user_id = v_user_id;

  IF v_existing_email_by_uid IS NOT NULL
     AND LOWER(v_existing_email_by_uid) <> c_target_email THEN
    RAISE EXCEPTION
      'IDENTITY CONFLICT: UUID % is already associated with email "%".',
      v_user_id,
      v_existing_email_by_uid;
  END IF;

  -- 6. Check email conflict

  SELECT user_id
  INTO v_existing_uid_by_email
  FROM public.admin_users
  WHERE LOWER(email) = c_target_email;

  IF v_existing_uid_by_email IS NOT NULL
     AND v_existing_uid_by_email <> v_user_id THEN
    RAISE EXCEPTION
      'ACCOUNT CONFLICT: Email "%" is already associated with UUID %.',
      c_target_email,
      v_existing_uid_by_email;
  END IF;

  -- 7. Provision Super Admin

  INSERT INTO public.admin_users (
    user_id,
    email,
    role,
    is_active,
    created_at
  )
  VALUES (
    v_user_id,
    c_target_email,
    'super_admin',
    TRUE,
    pg_catalog.now()
  )
  ON CONFLICT (user_id) DO UPDATE
  SET
    email = EXCLUDED.email,
    role = 'super_admin',
    is_active = TRUE
  WHERE public.admin_users.user_id = v_user_id
    AND LOWER(public.admin_users.email) = c_target_email;

  -- 8. Verify exactly one row was inserted or updated

  GET DIAGNOSTICS v_rows_affected = ROW_COUNT;

  IF v_rows_affected <> 1 THEN
    RAISE EXCEPTION
      'PROVISIONING FAILED: Expected exactly one affected row, but got %.',
      v_rows_affected;
  END IF;

  RAISE NOTICE '==============================================';
  RAISE NOTICE 'SUCCESS: Super Admin provisioned.';
  RAISE NOTICE 'Email: %', c_target_email;
  RAISE NOTICE 'UUID: %', v_user_id;
  RAISE NOTICE 'Role: super_admin';
  RAISE NOTICE 'Active: true';
  RAISE NOTICE 'Google identity: verified';
  RAISE NOTICE '==============================================';

END $$;

-- ==============================================================================
-- VERIFICATION QUERY
-- ==============================================================================

SELECT
  u.user_id,
  u.email,
  u.role,
  u.is_active,
  u.created_at,
  i.provider AS auth_provider,
  usr.email_confirmed_at
FROM public.admin_users AS u
JOIN auth.users AS usr
  ON usr.id = u.user_id
LEFT JOIN auth.identities AS i
  ON i.user_id = u.user_id
  AND i.provider = 'google'
WHERE LOWER(u.email) =
  LOWER(TRIM('ieeernsitstudentbranch@gmail.com'));
