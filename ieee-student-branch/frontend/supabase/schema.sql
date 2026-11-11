-- ========================================================
-- IEEE SB RNSIT - Supabase Database Schema
-- Run this in your Supabase Project: SQL Editor -> New query
-- ========================================================

-- 1. Create Single Admin Credentials Table
CREATE TABLE IF NOT EXISTS public.admin_credentials (
  id TEXT PRIMARY KEY DEFAULT 'primary_admin',
  username TEXT NOT NULL UNIQUE DEFAULT 'admin',
  password TEXT NOT NULL DEFAULT 'admin123',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  month TEXT NOT NULL,
  year TEXT NOT NULL,
  time TEXT NOT NULL,
  venue TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'WORKSHOP',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Executive Committee Table
CREATE TABLE IF NOT EXISTS public.executive_committee (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT NOT NULL,
  email TEXT,
  linkedin TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create Technical Domains Table
CREATE TABLE IF NOT EXISTS public.domains (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  short_title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'BrainCircuit',
  number TEXT NOT NULL DEFAULT '01',
  created_at TIMESTAMPTZ DEFAULT now()
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
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.executive_committee ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow read admin_credentials for login" ON public.admin_credentials;
DROP POLICY IF EXISTS "Public can view events" ON public.events;
DROP POLICY IF EXISTS "Public can view executive committee" ON public.executive_committee;
DROP POLICY IF EXISTS "Public can view domains" ON public.domains;
DROP POLICY IF EXISTS "Anyone can submit registration" ON public.registrations;
DROP POLICY IF EXISTS "Admins can manage admin_credentials" ON public.admin_credentials;
DROP POLICY IF EXISTS "Admins can manage events" ON public.events;
DROP POLICY IF EXISTS "Admins can manage executive committee" ON public.executive_committee;
DROP POLICY IF EXISTS "Admins can manage domains" ON public.domains;
DROP POLICY IF EXISTS "Admins can view and manage registrations" ON public.registrations;

-- Read policies for authentication and public display
CREATE POLICY "Allow read admin_credentials for login" ON public.admin_credentials FOR SELECT USING (true);
CREATE POLICY "Public can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public can view executive committee" ON public.executive_committee FOR SELECT USING (true);
CREATE POLICY "Public can view domains" ON public.domains FOR SELECT USING (true);

-- Anyone can submit membership registration
CREATE POLICY "Anyone can submit registration" ON public.registrations FOR INSERT WITH CHECK (true);

-- Full write access
CREATE POLICY "Admins can manage admin_credentials" ON public.admin_credentials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage events" ON public.events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage executive committee" ON public.executive_committee FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage domains" ON public.domains FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admins can view and manage registrations" ON public.registrations FOR ALL USING (true) WITH CHECK (true);

-- ========================================================
-- Seed Initial Data
-- ========================================================

-- Initial Single Admin Credentials
INSERT INTO public.admin_credentials (id, username, password)
VALUES 
  ('primary_admin', 'admin', 'admin123'),
  ('ieee_admin', 'ieee_admin@rnsit.ac.in', 'IEEE@RNSIT2026')
ON CONFLICT (id) DO NOTHING;

-- Initial Events
INSERT INTO public.events (id, title, description, date, month, year, time, venue, category)
VALUES
  ('event-1', 'AI & Machine Learning Workshop', 'A hands-on workshop introducing students to artificial intelligence, neural architectures and practical computer vision models.', '15', 'OCT', '2026', '10:00 AM', 'RNSIT Campus', 'WORKSHOP'),
  ('event-2', 'IEEE Innovation Hackathon', 'Build innovative software and hardware prototypes to solve real-world problems and pitch to seasoned industry judges.', '22', 'OCT', '2026', '9:00 AM', 'Innovation Lab', 'HACKATHON'),
  ('event-3', 'Research & Emerging Tech Talk', 'Learn from active IEEE researchers and tech leaders about quantum computing, next-gen communication and publishing papers.', '29', 'OCT', '2026', '2:00 PM', 'Seminar Hall', 'TECH TALK')
ON CONFLICT (id) DO NOTHING;

-- Initial Executive Committee
INSERT INTO public.executive_committee (id, name, role, description, email, linkedin)
VALUES
  ('execom-1', 'Suhan Ganesh', 'Student Chair', 'Leads the IEEE Student Branch and coordinates strategic growth, campus initiatives and chapter activities.', 'suhan@ieee.org', 'https://linkedin.com'),
  ('execom-2', 'Poorvika Nagraj', 'Student Vice Chair', 'Oversees technical societies, industry partnerships and core branch operations.', 'poorvika@ieee.org', 'https://linkedin.com'),
  ('execom-3', 'Nikhil Nayak', 'Webmaster', 'Architects digital platforms, manages the branch web ecosystem and online resources.', 'nikhil@ieee.org', 'https://linkedin.com'),
  ('execom-4', 'Bhadrinath G R', 'Treasurer', 'Directs budget allocations, financial audits and sponsorship logistics for all major events.', 'bhadrinath@ieee.org', 'https://linkedin.com'),
  ('execom-5', 'prathika P', 'Secretary', 'Coordinates executive proceedings, official IEEE communication and regulatory documentation.', 'prathika@ieee.org', 'https://linkedin.com')
ON CONFLICT (id) DO NOTHING;

-- Initial Domains
INSERT INTO public.domains (id, title, short_title, description, icon_name, number)
VALUES
  ('domain-1', 'Artificial Intelligence', 'AI / ML', 'Explore machine learning, deep neural nets, generative models and autonomous intelligent systems.', 'BrainCircuit', '01'),
  ('domain-2', 'Web & App Development', 'Development', 'Architect responsive modern web apps, microservices, mobile experiences and scalable cloud backends.', 'Code2', '02'),
  ('domain-3', 'Robotics & IoT', 'Robotics', 'Design smart microcontrollers, automation solutions, sensor telemetry and embedded robotic hardware.', 'Cpu', '03'),
  ('domain-4', 'Cybersecurity & Networks', 'Security', 'Learn penetration testing, cryptosystems, secure coding and digital infrastructure defense.', 'ShieldCheck', '04'),
  ('domain-5', 'Cloud Computing & DevOps', 'Cloud', 'Master distributed cloud platforms, containerization pipelines, Kubernetes and CI/CD automation.', 'Cloud', '05'),
  ('domain-6', 'Research & Innovation', 'Research', 'Turn novel concepts into IEEE conference papers, verified prototypes and high-impact patents.', 'FlaskConical', '06')
ON CONFLICT (id) DO NOTHING;
