-- ========================================================
-- IEEE SB RNSIT - Master Supabase Database Schema
-- Run this in your Supabase Project: SQL Editor -> New query
-- ========================================================

-- 1. Create Dedicated Administrator Allowlist Table
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON public.admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON public.admin_users(is_active);

-- 2. Create Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  month TEXT NOT NULL,
  year TEXT NOT NULL,
  time TEXT NOT NULL,
  venue TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'WORKSHOP',
  registration_url TEXT,
  parent_event_id TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed')),
  recap TEXT,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT pg_catalog.now()
);


-- Ensure existing installations receive the same event columns as fresh installs.
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS registration_url TEXT,
  ADD COLUMN IF NOT EXISTS parent_event_id TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'upcoming',
  ADD COLUMN IF NOT EXISTS recap TEXT,
  ADD COLUMN IF NOT EXISTS cover_image_url TEXT;

ALTER TABLE public.events ALTER COLUMN description DROP NOT NULL;
ALTER TABLE public.events ALTER COLUMN status SET DEFAULT 'upcoming';
UPDATE public.events SET status = 'upcoming' WHERE status IS NULL OR status = '';
ALTER TABLE public.events ALTER COLUMN status SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.events'::regclass
      AND conname = 'events_status_check'
  ) THEN
    ALTER TABLE public.events
      ADD CONSTRAINT events_status_check CHECK (status IN ('upcoming', 'completed'));
  END IF;
END $$;

-- 2A. Event photo metadata (binary files live in Supabase Storage)
CREATE TABLE IF NOT EXISTS public.event_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL UNIQUE,
  public_url TEXT NOT NULL,
  file_name TEXT,
  is_cover BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

CREATE INDEX IF NOT EXISTS idx_event_photos_event_id ON public.event_photos(event_id);
CREATE INDEX IF NOT EXISTS idx_event_photos_order ON public.event_photos(event_id, display_order);
CREATE UNIQUE INDEX IF NOT EXISTS idx_event_photos_single_cover
  ON public.event_photos(event_id) WHERE is_cover = true;

-- 3. Create Executive Committee Table
CREATE TABLE IF NOT EXISTS public.executive_committee (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT NOT NULL,
  email TEXT,
  linkedin TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT pg_catalog.now()
);

-- 4. Create Technical Domains Table
CREATE TABLE IF NOT EXISTS public.domains (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  short_title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'BrainCircuit',
  number TEXT NOT NULL DEFAULT '01',
  created_at TIMESTAMPTZ DEFAULT pg_catalog.now()
);

-- 5. Create Registrations / Student Memberships Table
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  branch TEXT NOT NULL,
  year TEXT NOT NULL,
  domain TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT pg_catalog.now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.executive_committee ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- ========================================================
-- Authorization Functions (SECURITY DEFINER with search_path = '')
-- ========================================================

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

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_super_admin() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.can_manage_registrations() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_current_admin_profile() FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.can_manage_registrations() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_current_admin_profile() TO authenticated, service_role;

-- ========================================================
-- Row Level Security Policies
-- ========================================================

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


-- Events
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


-- Event photos
DROP POLICY IF EXISTS "Public can view event photos" ON public.event_photos;
CREATE POLICY "Public can view event photos"
  ON public.event_photos FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Admins manage event photos" ON public.event_photos;
CREATE POLICY "Admins manage event photos"
  ON public.event_photos FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Executive Committee
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


-- Domains
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


-- Membership / Registration Applications
DROP POLICY IF EXISTS "Public visitors can submit registrations" ON public.registrations;
DROP POLICY IF EXISTS "Anyone can submit registration" ON public.registrations;

CREATE POLICY "Public visitors can submit registrations"
  ON public.registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);


DROP POLICY IF EXISTS "Admins can view and manage registrations" ON public.registrations;

CREATE POLICY "Admins can view and manage registrations"
  ON public.registrations
  FOR ALL
  TO authenticated
  USING (public.can_manage_registrations())
  WITH CHECK (public.can_manage_registrations());


-- Policies for admin_users
DROP POLICY IF EXISTS "Active admins can view admin allowlist" ON public.admin_users;

CREATE POLICY "Active admins can view admin allowlist"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (public.is_admin());


DROP POLICY IF EXISTS "Super admins can manage admin allowlist" ON public.admin_users;

CREATE POLICY "Super admins can manage admin allowlist"
  ON public.admin_users
  FOR ALL
  TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- Lock down legacy admin_credentials if exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_catalog.pg_tables
    WHERE schemaname = 'public' AND tablename = 'admin_credentials'
  ) THEN
    ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Allow read admin_credentials for login" ON public.admin_credentials;
    DROP POLICY IF EXISTS "Admins can manage admin_credentials" ON public.admin_credentials;
    DROP POLICY IF EXISTS "No access to legacy admin credentials" ON public.admin_credentials;
    DROP POLICY IF EXISTS "Deny all access to legacy credentials" ON public.admin_credentials;

    CREATE POLICY "Deny all access to legacy credentials"
      ON public.admin_credentials
      AS RESTRICTIVE
      FOR ALL
      TO public, anon, authenticated
      USING (false)
      WITH CHECK (false);

    REVOKE ALL ON TABLE public.admin_credentials FROM anon, authenticated, public;
  END IF;
END $$;

-- Explicit Table Grants & Privilege Revocations (Least Privilege)
REVOKE ALL ON TABLE public.events FROM anon, public;
REVOKE ALL ON TABLE public.executive_committee FROM anon, public;
REVOKE ALL ON TABLE public.domains FROM anon, public;

REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.events FROM authenticated;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.executive_committee FROM authenticated;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.domains FROM authenticated;

GRANT SELECT ON TABLE public.events TO anon, authenticated;
GRANT SELECT ON TABLE public.executive_committee TO anon, authenticated;
GRANT SELECT ON TABLE public.domains TO anon, authenticated;

GRANT INSERT, UPDATE, DELETE ON TABLE public.events TO authenticated;
GRANT SELECT ON TABLE public.event_photos TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.event_photos TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.executive_committee TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.domains TO authenticated;

REVOKE ALL ON TABLE public.registrations FROM anon, public;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.registrations FROM authenticated;

GRANT INSERT ON TABLE public.registrations TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON TABLE public.registrations TO authenticated;

REVOKE ALL ON TABLE public.admin_users FROM anon, public;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.admin_users FROM authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.admin_users TO authenticated;

-- Public bucket for public event photos only
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-photos', 'event-photos', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view event photo objects" ON storage.objects;
CREATE POLICY "Public can view event photo objects"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'event-photos');

DROP POLICY IF EXISTS "Admins upload event photo objects" ON storage.objects;
CREATE POLICY "Admins upload event photo objects"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'event-photos' AND public.is_admin());

DROP POLICY IF EXISTS "Admins update event photo objects" ON storage.objects;
CREATE POLICY "Admins update event photo objects"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'event-photos' AND public.is_admin())
  WITH CHECK (bucket_id = 'event-photos' AND public.is_admin());

DROP POLICY IF EXISTS "Admins delete event photo objects" ON storage.objects;
CREATE POLICY "Admins delete event photo objects"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'event-photos' AND public.is_admin());

-- ========================================================
-- Seed Initial Content Data
-- ========================================================

INSERT INTO public.events (id, title, description, date, month, year, time, venue, category)
VALUES
  ('event-1', 'AI & Machine Learning Workshop', 'A hands-on workshop introducing students to artificial intelligence, neural architectures and practical computer vision models.', '15', 'OCT', '2026', '10:00 AM', 'RNSIT Campus', 'WORKSHOP'),
  ('event-2', 'IEEE Innovation Hackathon', 'Build innovative software and hardware prototypes to solve real-world problems and pitch to seasoned industry judges.', '22', 'OCT', '2026', '9:00 AM', 'Innovation Lab', 'HACKATHON'),
  ('event-3', 'Research & Emerging Tech Talk', 'Learn from active IEEE researchers and tech leaders about quantum computing, next-gen communication and publishing papers.', '29', 'OCT', '2026', '2:00 PM', 'Seminar Hall', 'TECH TALK')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.executive_committee (id, name, role, description, email, linkedin)
VALUES
  ('execom-1', 'Suhan Ganesh', 'Student Chair', 'Leads the IEEE Student Branch and coordinates strategic growth, campus initiatives and chapter activities.', 'suhan@ieee.org', 'https://linkedin.com'),
  ('execom-2', 'Poorvika Nagraj', 'Student Vice Chair', 'Oversees technical societies, industry partnerships and core branch operations.', 'poorvika@ieee.org', 'https://linkedin.com'),
  ('execom-3', 'Nikhil Nayak', 'Webmaster', 'Architects digital platforms, manages the branch web ecosystem and online resources.', 'nikhil@ieee.org', 'https://linkedin.com'),
  ('execom-4', 'Bhadrinath G R', 'Treasurer', 'Directs budget allocations, financial audits and sponsorship logistics for all major events.', 'bhadrinath@ieee.org', 'https://linkedin.com'),
  ('execom-5', 'Prathika P', 'Secretary', 'Coordinates executive proceedings, official IEEE communication and regulatory documentation.', 'prathika@ieee.org', 'https://linkedin.com')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.domains (id, title, short_title, description, icon_name, number)
VALUES
  ('domain-1', 'Artificial Intelligence', 'AI / ML', 'Explore machine learning, deep neural nets, generative models and autonomous intelligent systems.', 'BrainCircuit', '01'),
  ('domain-2', 'Web & App Development', 'Development', 'Architect responsive modern web apps, microservices, mobile experiences and scalable cloud backends.', 'Code2', '02'),
  ('domain-3', 'Robotics & IoT', 'Robotics', 'Design smart microcontrollers, automation solutions, sensor telemetry and embedded robotic hardware.', 'Cpu', '03'),
  ('domain-4', 'Cybersecurity & Networks', 'Security', 'Learn penetration testing, cryptosystems, secure coding and digital infrastructure defense.', 'ShieldCheck', '04'),
  ('domain-5', 'Cloud Computing & DevOps', 'Cloud', 'Master distributed cloud platforms, containerization pipelines, Kubernetes and CI/CD automation.', 'Cloud', '05'),
  ('domain-6', 'Research & Innovation', 'Research', 'Turn novel concepts into IEEE conference papers, verified prototypes and high-impact patents.', 'FlaskConical', '06')
ON CONFLICT (id) DO NOTHING;
