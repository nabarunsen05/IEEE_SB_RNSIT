-- ==============================================================================
-- IEEE SB RNSIT - Google OAuth & Role-Based Access Control Security Migration
-- File: supabase/migrations/20261122_google_oauth_admin_users.sql
-- Target: Supabase PostgreSQL (Run in Supabase Dashboard -> SQL Editor)
-- ==============================================================================
--
-- SECURITY OBJECTIVES:
-- 1. Explicitly enable Row-Level Security (RLS) on all protected tables.
-- 2. Drop all legacy permissive policies that allowed unauthorized access.
-- 3. Harden all SECURITY DEFINER authorization functions with search_path = ''.
-- 4. Enforce strict role-based authorization:
--      - super_admin: Full administration and administrator allowlist management.
--      - admin: Website content and student registration management.
--      - editor: Website content management only (strictly NO registration access).
-- 5. Lock down legacy admin_credentials table without dropping or deleting data.
-- 6. Preserve anonymous public registration submissions and public content viewing.
-- 7. Ensure anonymous visitors cannot read, update, or delete registrations.
-- 8. Explicitly revoke anonymous and PUBLIC write privileges across all tables.
-- 9. Explicitly revoke TRUNCATE, REFERENCES, and TRIGGER from client roles (RLS does not guard TRUNCATE).
--
-- IDEMPOTENCY: Fully idempotent. Every policy and function can safely be reapplied.
-- ==============================================================================

BEGIN;

-- ==============================================================================
-- 1. CORE SCHEMA: ADMINISTRATOR ALLOWLIST TABLE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Performance indexes for lookup operations
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON public.admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON public.admin_users(is_active);

-- ==============================================================================
-- 2. EXPLICIT ROW LEVEL SECURITY (RLS) ENFORCEMENT
-- ==============================================================================

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.executive_committee ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 3. HARDENED AUTHORIZATION FUNCTIONS (SECURITY DEFINER with search_path = '')
-- ==============================================================================

-- Function 1: Check if calling user is an active administrator (any valid role)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users AS au
    WHERE au.user_id = (SELECT auth.uid())
      AND au.is_active = TRUE
  );
$$;

-- Function 2: Check if calling user is an active super administrator
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users AS au
    WHERE au.user_id = (SELECT auth.uid())
      AND au.role = 'super_admin'
      AND au.is_active = TRUE
  );
$$;

-- Function 3: Check if calling user can view and manage student registrations
-- Only 'super_admin' and 'admin' roles can access registrations; 'editor' cannot.
CREATE OR REPLACE FUNCTION public.can_manage_registrations()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users AS au
    WHERE au.user_id = (SELECT auth.uid())
      AND au.role IN ('super_admin', 'admin')
      AND au.is_active = TRUE
  );
$$;

-- Function 4: Securely fetch current caller's administrator profile
-- Takes NO arguments; strictly binds to auth.uid() to prevent inspecting other users
CREATE OR REPLACE FUNCTION public.get_current_admin_profile()
RETURNS TABLE (
  user_id UUID,
  email TEXT,
  role TEXT,
  is_active BOOLEAN,
  created_at TIMESTAMPTZ
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT
    au.user_id,
    au.email,
    au.role,
    au.is_active,
    au.created_at
  FROM public.admin_users AS au
  WHERE au.user_id = (SELECT auth.uid())
    AND au.is_active = TRUE;
$$;

-- Remove default and any explicitly assigned anonymous execution privileges
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_super_admin() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.can_manage_registrations() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_current_admin_profile() FROM PUBLIC, anon;

-- Allow authenticated users and Supabase service role
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.can_manage_registrations() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_current_admin_profile() TO authenticated, service_role;
-- ==============================================================================
-- 4. ROW LEVEL SECURITY POLICIES: PUBLIC CONTENT TABLES
-- ==============================================================================

-- Remove existing live policy names found in Supabase pg_policies

-- Events
DROP POLICY IF EXISTS "Public can read events" ON public.events;
DROP POLICY IF EXISTS "Admins manage events" ON public.events;

-- Executive committee
DROP POLICY IF EXISTS "Public can read executive committee" ON public.executive_committee;
DROP POLICY IF EXISTS "Admins manage executive committee" ON public.executive_committee;

-- Domains
DROP POLICY IF EXISTS "Public can read domains" ON public.domains;
DROP POLICY IF EXISTS "Admins manage domains" ON public.domains;

-- Registrations
DROP POLICY IF EXISTS "Public can submit registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins manage registrations" ON public.registrations;


-- Events Table
DROP POLICY IF EXISTS "Public can view events" ON public.events;
CREATE POLICY "Public can view events"
  ON public.events
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins and editors can manage events" ON public.events;
DROP POLICY IF EXISTS "Admins can manage events" ON public.events;

CREATE POLICY "Admins and editors can manage events"
  ON public.events
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());


-- Executive Committee Table
DROP POLICY IF EXISTS "Public can view executive committee" ON public.executive_committee;
CREATE POLICY "Public can view executive committee"
  ON public.executive_committee
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins and editors can manage executive committee" ON public.executive_committee;
DROP POLICY IF EXISTS "Admins can manage executive committee" ON public.executive_committee;

CREATE POLICY "Admins and editors can manage executive committee"
  ON public.executive_committee
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());


-- Domains Table
DROP POLICY IF EXISTS "Public can view domains" ON public.domains;
CREATE POLICY "Public can view domains"
  ON public.domains
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins and editors can manage domains" ON public.domains;
DROP POLICY IF EXISTS "Admins can manage domains" ON public.domains;

CREATE POLICY "Admins and editors can manage domains"
  ON public.domains
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());


-- ==============================================================================
-- 5. ROW LEVEL SECURITY POLICIES: STUDENT REGISTRATIONS
-- ==============================================================================

-- Public registration submissions
DROP POLICY IF EXISTS "Public visitors can submit registrations" ON public.registrations;
DROP POLICY IF EXISTS "Anyone can submit registration" ON public.registrations;

CREATE POLICY "Public visitors can submit registrations"
  ON public.registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);


-- Only super_admin and admin can manage registrations
DROP POLICY IF EXISTS "Admins can view and manage registrations" ON public.registrations;

CREATE POLICY "Admins can view and manage registrations"
  ON public.registrations
  FOR ALL
  TO authenticated
  USING (public.can_manage_registrations())
  WITH CHECK (public.can_manage_registrations());

-- ==============================================================================
-- 6. ROW LEVEL SECURITY POLICIES: ADMINISTRATOR ALLOWLIST
-- ==============================================================================

-- Active administrators (super_admin, admin, editor) can view the admin roster
DROP POLICY IF EXISTS "Active admins can view admin allowlist" ON public.admin_users;
CREATE POLICY "Active admins can view admin allowlist"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Only Super Admins can insert, update, or delete administrator accounts
-- Prevents ordinary admins or editors from altering permissions or granting super_admin
DROP POLICY IF EXISTS "Super admins can manage admin allowlist" ON public.admin_users;
CREATE POLICY "Super admins can manage admin allowlist"
  ON public.admin_users
  FOR ALL
  TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- ==============================================================================
-- 7. LEGACY CREDENTIALS TABLE LOCKDOWN (DEFENSE IN DEPTH)
-- ==============================================================================

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_catalog.pg_tables
    WHERE schemaname = 'public' AND tablename = 'admin_credentials'
  ) THEN
    -- Explicitly enable Row Level Security on legacy credentials
    ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;

    -- Drop legacy policies
    DROP POLICY IF EXISTS "Allow read admin_credentials for login" ON public.admin_credentials;
    DROP POLICY IF EXISTS "Admins can manage admin_credentials" ON public.admin_credentials;
    DROP POLICY IF EXISTS "No access to legacy admin credentials" ON public.admin_credentials;
    DROP POLICY IF EXISTS "Deny all access to legacy credentials" ON public.admin_credentials;

    -- Create explicit restrictive deny-all policy
    CREATE POLICY "Deny all access to legacy credentials"
      ON public.admin_credentials
      AS RESTRICTIVE
      FOR ALL
      TO public, anon, authenticated
      USING (false)
      WITH CHECK (false);

    -- Revoke all table privileges from client roles
    REVOKE ALL ON TABLE public.admin_credentials FROM anon, authenticated, public;
  END IF;
END $$;

-- ==============================================================================
-- 8. EXPLICIT TABLE GRANTS & PRIVILEGE REVOCATIONS (LEAST PRIVILEGE)
-- ==============================================================================

-- 1. Events, Executive Committee, Domains
-- Revoke all permissions from anon and public; revoke DDL/maintenance privileges from authenticated
REVOKE ALL ON TABLE public.events FROM anon, public;
REVOKE ALL ON TABLE public.executive_committee FROM anon, public;
REVOKE ALL ON TABLE public.domains FROM anon, public;

REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.events FROM authenticated;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.executive_committee FROM authenticated;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.domains FROM authenticated;

-- Grant SELECT to public visitors and authenticated users
GRANT SELECT ON TABLE public.events TO anon, authenticated;
GRANT SELECT ON TABLE public.executive_committee TO anon, authenticated;
GRANT SELECT ON TABLE public.domains TO anon, authenticated;

-- Grant DML write privileges to authenticated users (governed by RLS is_admin())
GRANT INSERT, UPDATE, DELETE ON TABLE public.events TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.executive_committee TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.domains TO authenticated;

-- 2. Student Registrations
-- Revoke all permissions from anon and public; revoke TRUNCATE, REFERENCES, TRIGGER from authenticated
REVOKE ALL ON TABLE public.registrations FROM anon, public;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.registrations FROM authenticated;

-- Grant INSERT only to anon and authenticated (governed by RLS)
GRANT INSERT ON TABLE public.registrations TO anon, authenticated;

-- Grant DML management privileges to authenticated (governed by RLS can_manage_registrations())
GRANT SELECT, UPDATE, DELETE ON TABLE public.registrations TO authenticated;

-- 3. Administrator Allowlist (admin_users)
-- Revoke all privileges from anon and public; revoke TRUNCATE, REFERENCES, TRIGGER from authenticated
REVOKE ALL ON TABLE public.admin_users FROM anon, public;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.admin_users FROM authenticated;

-- Grant DML access to authenticated (governed by RLS is_admin() and is_super_admin())
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.admin_users TO authenticated;

COMMIT;

-- ==============================================================================
-- SAFE ROLLBACK GUIDANCE (DO NOT RE-ESTABLISH INSECURE POLICIES)
-- ==============================================================================
-- If you need to revert role distinctions without compromising data security:
--
-- 1. To allow all active administrators (including editors) to manage registrations:
--    DROP POLICY IF EXISTS "Admins can view and manage registrations" ON public.registrations;
--    CREATE POLICY "Admins can view and manage registrations"
--      ON public.registrations
--      FOR ALL
--      TO authenticated
--      USING (public.is_admin())
--      WITH CHECK (public.is_admin());
--    (NEVER restore `USING (true)` or grant access to `anon`).
--
-- 2. To adjust function security settings safely:
--    ALTER FUNCTION public.is_admin() SET search_path = '';
--    ALTER FUNCTION public.is_super_admin() SET search_path = '';
--    ALTER FUNCTION public.can_manage_registrations() SET search_path = '';
--    ALTER FUNCTION public.get_current_admin_profile() SET search_path = '';
--
-- 3. Never drop tables or delete existing registration/admin records during rollback.
-- ==============================================================================
