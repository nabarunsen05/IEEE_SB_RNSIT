-- IEEE RNSIT: public event registration + manual payment confirmation
-- Keeps public.registrations (IEEE membership applications) untouched.
-- Assumes public.events.id is TEXT and public.is_admin() / public.is_super_admin()
-- already exist, as in the current project.

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS registration_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS registration_type TEXT NOT NULL DEFAULT 'individual'
    CHECK (registration_type IN ('individual', 'team')),
  ADD COLUMN IF NOT EXISTS min_team_size INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS max_team_size INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS registration_deadline TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS payment_required BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS payment_portal_url TEXT,
  ADD COLUMN IF NOT EXISTS payment_instructions TEXT,
  ADD COLUMN IF NOT EXISTS registration_capacity INTEGER;

ALTER TABLE public.events
  DROP CONSTRAINT IF EXISTS events_team_size_valid;
ALTER TABLE public.events
  ADD CONSTRAINT events_team_size_valid
  CHECK (
    min_team_size >= 1
    AND max_team_size >= min_team_size
    AND (registration_type = 'team' OR (min_team_size = 1 AND max_team_size = 1))
  );

ALTER TABLE public.events
  DROP CONSTRAINT IF EXISTS events_registration_capacity_valid;
ALTER TABLE public.events
  ADD CONSTRAINT events_registration_capacity_valid
  CHECK (registration_capacity IS NULL OR registration_capacity > 0);

CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_code TEXT NOT NULL UNIQUE,
  event_id TEXT NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  registration_type TEXT NOT NULL CHECK (registration_type IN ('individual', 'team')),
  leader_name TEXT NOT NULL,
  leader_usn TEXT NOT NULL,
  leader_college TEXT NOT NULL,
  leader_department TEXT NOT NULL,
  leader_year TEXT NOT NULL,
  leader_phone TEXT NOT NULL,
  leader_email TEXT NOT NULL,
  leader_is_ieee_member BOOLEAN NOT NULL DEFAULT FALSE,
  leader_ieee_membership_number TEXT,
  team_size INTEGER NOT NULL DEFAULT 1 CHECK (team_size >= 1),
  payment_required BOOLEAN NOT NULL DEFAULT FALSE,
  payment_status TEXT NOT NULL DEFAULT 'not_required'
    CHECK (payment_status IN ('not_required', 'pending', 'paid', 'rejected')),
  registration_status TEXT NOT NULL DEFAULT 'confirmed'
    CHECK (registration_status IN ('confirmed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  payment_confirmed_at TIMESTAMPTZ,
  payment_confirmed_by UUID REFERENCES auth.users(id),
  admin_notes TEXT
);

CREATE TABLE IF NOT EXISTS public.event_registration_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL REFERENCES public.event_registrations(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  usn TEXT NOT NULL,
  college TEXT NOT NULL,
  department TEXT NOT NULL,
  year TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS event_registrations_event_id_idx
  ON public.event_registrations(event_id);
CREATE INDEX IF NOT EXISTS event_registrations_created_at_idx
  ON public.event_registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS event_registration_members_registration_id_idx
  ON public.event_registration_members(registration_id);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registration_members ENABLE ROW LEVEL SECURITY;

-- Never expose student PII to anonymous visitors or ordinary authenticated users.
DROP POLICY IF EXISTS "Admins can read event registrations" ON public.event_registrations;
CREATE POLICY "Admins can read event registrations"
  ON public.event_registrations FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update event registrations" ON public.event_registrations;
CREATE POLICY "Admins can update event registrations"
  ON public.event_registrations FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can read event registration members" ON public.event_registration_members;
CREATE POLICY "Admins can read event registration members"
  ON public.event_registration_members FOR SELECT TO authenticated
  USING (public.is_admin());

REVOKE ALL ON public.event_registrations FROM anon, authenticated;
REVOKE ALL ON public.event_registration_members FROM anon, authenticated;
GRANT SELECT, UPDATE ON public.event_registrations TO authenticated;
GRANT SELECT ON public.event_registration_members TO authenticated;

-- Public insert happens only through this validation RPC. No direct table INSERT grants.
CREATE OR REPLACE FUNCTION public.submit_event_registration(p_event_id TEXT, p_payload JSONB)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_event public.events%ROWTYPE;
  v_leader JSONB;
  v_members JSONB;
  v_team_size INTEGER;
  v_registration_id UUID;
  v_code TEXT;
  v_payment_status TEXT;
  v_member JSONB;
BEGIN
  SELECT * INTO v_event
  FROM public.events
  WHERE id = p_event_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Event not found';
  END IF;

  IF NOT COALESCE(v_event.registration_enabled, FALSE) THEN
    RAISE EXCEPTION 'Registration is not open for this event';
  END IF;

  IF v_event.registration_deadline IS NOT NULL
     AND NOW() > v_event.registration_deadline THEN
    RAISE EXCEPTION 'The registration deadline has passed';
  END IF;

  IF v_event.registration_capacity IS NOT NULL
     AND (
       SELECT COUNT(*) FROM public.event_registrations r
       WHERE r.event_id = p_event_id AND r.registration_status = 'confirmed'
     ) >= v_event.registration_capacity THEN
    RAISE EXCEPTION 'Registration capacity has been reached';
  END IF;

  v_leader := p_payload -> 'leader';
  v_members := COALESCE(p_payload -> 'members', '[]'::JSONB);
  IF jsonb_typeof(v_members) <> 'array' THEN
    RAISE EXCEPTION 'Team members must be an array';
  END IF;

  v_team_size := 1 + jsonb_array_length(v_members);

  IF v_event.registration_type = 'individual' AND v_team_size <> 1 THEN
    RAISE EXCEPTION 'This event accepts individual registrations only';
  END IF;
  IF v_team_size < v_event.min_team_size OR v_team_size > v_event.max_team_size THEN
    RAISE EXCEPTION 'Team size must be between % and %',
      v_event.min_team_size, v_event.max_team_size;
  END IF;

  IF NULLIF(BTRIM(v_leader->>'full_name'), '') IS NULL
     OR NULLIF(BTRIM(v_leader->>'usn'), '') IS NULL
     OR NULLIF(BTRIM(v_leader->>'college'), '') IS NULL
     OR NULLIF(BTRIM(v_leader->>'department'), '') IS NULL
     OR NULLIF(BTRIM(v_leader->>'year'), '') IS NULL
     OR NULLIF(BTRIM(v_leader->>'phone'), '') IS NULL
     OR NULLIF(BTRIM(v_leader->>'email'), '') IS NULL THEN
    RAISE EXCEPTION 'Please complete all required team leader details';
  END IF;

  IF COALESCE((v_leader->>'is_ieee_member')::BOOLEAN, FALSE)
     AND NULLIF(BTRIM(v_leader->>'ieee_membership_number'), '') IS NULL THEN
    RAISE EXCEPTION 'IEEE membership number is required for IEEE members';
  END IF;

  FOR v_member IN SELECT value FROM jsonb_array_elements(v_members)
  LOOP
    IF NULLIF(BTRIM(v_member->>'full_name'), '') IS NULL
       OR NULLIF(BTRIM(v_member->>'usn'), '') IS NULL
       OR NULLIF(BTRIM(v_member->>'college'), '') IS NULL
       OR NULLIF(BTRIM(v_member->>'department'), '') IS NULL
       OR NULLIF(BTRIM(v_member->>'year'), '') IS NULL THEN
      RAISE EXCEPTION 'Please complete all required details for every team member';
    END IF;
  END LOOP;

  v_registration_id := gen_random_uuid();
  v_code := 'IEEE-' || UPPER(SUBSTRING(REPLACE(v_registration_id::TEXT, '-', '') FROM 1 FOR 10));
  v_payment_status := CASE WHEN v_event.payment_required THEN 'pending' ELSE 'not_required' END;

  INSERT INTO public.event_registrations (
    id, registration_code, event_id, registration_type,
    leader_name, leader_usn, leader_college, leader_department, leader_year,
    leader_phone, leader_email, leader_is_ieee_member, leader_ieee_membership_number,
    team_size, payment_required, payment_status
  ) VALUES (
    v_registration_id, v_code, p_event_id, v_event.registration_type,
    BTRIM(v_leader->>'full_name'), BTRIM(v_leader->>'usn'),
    BTRIM(v_leader->>'college'), BTRIM(v_leader->>'department'),
    BTRIM(v_leader->>'year'), BTRIM(v_leader->>'phone'),
    LOWER(BTRIM(v_leader->>'email')),
    COALESCE((v_leader->>'is_ieee_member')::BOOLEAN, FALSE),
    NULLIF(BTRIM(v_leader->>'ieee_membership_number'), ''),
    v_team_size, v_event.payment_required, v_payment_status
  );

  FOR v_member IN SELECT value FROM jsonb_array_elements(v_members)
  LOOP
    INSERT INTO public.event_registration_members (
      registration_id, full_name, usn, college, department, year
    ) VALUES (
      v_registration_id, BTRIM(v_member->>'full_name'), BTRIM(v_member->>'usn'),
      BTRIM(v_member->>'college'), BTRIM(v_member->>'department'), BTRIM(v_member->>'year')
    );
  END LOOP;

  RETURN jsonb_build_object(
    'registration_id', v_registration_id,
    'registration_code', v_code,
    'payment_required', v_event.payment_required,
    'payment_status', v_payment_status,
    'payment_portal_url', v_event.payment_portal_url,
    'payment_instructions', v_event.payment_instructions
  );
END;
$$;

REVOKE ALL ON FUNCTION public.submit_event_registration(TEXT, JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_event_registration(TEXT, JSONB) TO anon, authenticated;

-- Admin-only payment status update. Admin identity is taken from the verified session.
CREATE OR REPLACE FUNCTION public.admin_confirm_event_payment(
  p_registration_id UUID,
  p_paid BOOLEAN,
  p_notes TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT public.is_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  UPDATE public.event_registrations
  SET payment_status = CASE WHEN p_paid THEN 'paid' ELSE 'rejected' END,
      payment_confirmed_at = CASE WHEN p_paid THEN NOW() ELSE NULL END,
      payment_confirmed_by = CASE WHEN p_paid THEN auth.uid() ELSE NULL END,
      admin_notes = p_notes
  WHERE id = p_registration_id AND payment_required = TRUE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Registration not found or payment is not required';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_confirm_event_payment(UUID, BOOLEAN, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_confirm_event_payment(UUID, BOOLEAN, TEXT) TO authenticated;

-- Allow admins to read events with registration configuration through existing event policies.
