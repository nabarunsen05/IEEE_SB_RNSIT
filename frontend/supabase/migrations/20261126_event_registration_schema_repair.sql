-- Repair migration for an already-created event_registrations table.
-- Fixes missing registration_code and aligns the submit RPC with the simplified
-- shared Department / College / Year + leader/member details form.
BEGIN;

-- Repair databases where an earlier version created event_registrations without registration_code.
ALTER TABLE public.event_registrations
  ADD COLUMN IF NOT EXISTS registration_code TEXT;

UPDATE public.event_registrations
SET registration_code = 'IEEE-' || UPPER(SUBSTRING(REPLACE(id::TEXT, '-', '') FROM 1 FOR 10))
WHERE registration_code IS NULL OR BTRIM(registration_code) = '';

CREATE UNIQUE INDEX IF NOT EXISTS event_registrations_registration_code_uidx
  ON public.event_registrations(registration_code);

ALTER TABLE public.event_registrations
  ALTER COLUMN registration_code SET NOT NULL;

CREATE OR REPLACE FUNCTION public.submit_event_registration(p_event_id TEXT, p_payload JSONB)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE
  v_event public.events%ROWTYPE;
  v_leader JSONB;
  v_members JSONB;
  v_member JSONB;
  v_department TEXT;
  v_college TEXT;
  v_year TEXT;
  v_team_size INTEGER;
  v_registration_id UUID;
  v_code TEXT;
  v_payment_status TEXT;
BEGIN
  SELECT * INTO v_event FROM public.events WHERE id = p_event_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Event not found'; END IF;
  IF NOT COALESCE(v_event.registration_enabled,FALSE) THEN RAISE EXCEPTION 'Registration is not open for this event'; END IF;
  IF v_event.status = 'completed' THEN RAISE EXCEPTION 'Registration is closed for this event'; END IF;
  IF v_event.registration_deadline IS NOT NULL AND NOW() > v_event.registration_deadline THEN RAISE EXCEPTION 'The registration deadline has passed'; END IF;
  IF v_event.payment_required AND NULLIF(BTRIM(v_event.payment_portal_url),'') IS NULL THEN RAISE EXCEPTION 'Payment portal is not configured for this event'; END IF;
  IF v_event.registration_capacity IS NOT NULL AND (SELECT COUNT(*) FROM public.event_registrations r WHERE r.event_id=p_event_id) >= v_event.registration_capacity THEN RAISE EXCEPTION 'Registration capacity has been reached'; END IF;

  v_leader := p_payload->'leader';
  v_members := COALESCE(p_payload->'members','[]'::JSONB);
  v_department := NULLIF(BTRIM(p_payload->>'department'),'');
  v_college := NULLIF(BTRIM(p_payload->>'college'),'');
  v_year := NULLIF(BTRIM(p_payload->>'year'),'');
  IF v_leader IS NULL OR jsonb_typeof(v_members) <> 'array' THEN RAISE EXCEPTION 'Invalid registration payload'; END IF;
  v_team_size := 1 + jsonb_array_length(v_members);
  IF v_event.registration_type='individual' AND v_team_size <> 1 THEN RAISE EXCEPTION 'This event accepts individual registrations only'; END IF;
  IF v_team_size < v_event.min_team_size OR v_team_size > v_event.max_team_size THEN RAISE EXCEPTION 'Team size must be between % and %',v_event.min_team_size,v_event.max_team_size; END IF;
  IF v_department IS NULL OR v_college IS NULL OR v_year IS NULL THEN RAISE EXCEPTION 'Please complete department, college and year'; END IF;
  IF NULLIF(BTRIM(v_leader->>'full_name'),'') IS NULL OR NULLIF(BTRIM(v_leader->>'usn'),'') IS NULL OR NULLIF(BTRIM(v_leader->>'phone'),'') IS NULL OR NULLIF(BTRIM(v_leader->>'email'),'') IS NULL THEN RAISE EXCEPTION 'Please complete all required team leader details'; END IF;

  FOR v_member IN SELECT value FROM jsonb_array_elements(v_members) LOOP
    IF NULLIF(BTRIM(v_member->>'full_name'),'') IS NULL OR NULLIF(BTRIM(v_member->>'usn'),'') IS NULL THEN RAISE EXCEPTION 'Please complete the full name and USN for every team member'; END IF;
  END LOOP;

  v_registration_id := gen_random_uuid();
  v_code := 'IEEE-' || UPPER(SUBSTRING(REPLACE(v_registration_id::TEXT,'-','') FROM 1 FOR 10));
  v_payment_status := CASE WHEN v_event.payment_required THEN 'pending' ELSE 'not_required' END;

  INSERT INTO public.event_registrations(
    id,registration_code,event_id,registration_type,leader_name,leader_usn,
    leader_college,leader_department,leader_year,leader_phone,leader_email,
    team_size,payment_required,payment_status
  ) VALUES (
    v_registration_id,v_code,p_event_id,v_event.registration_type,
    BTRIM(v_leader->>'full_name'),UPPER(BTRIM(v_leader->>'usn')),
    v_college,v_department,v_year,BTRIM(v_leader->>'phone'),LOWER(BTRIM(v_leader->>'email')),
    v_team_size,v_event.payment_required,v_payment_status
  );

  FOR v_member IN SELECT value FROM jsonb_array_elements(v_members) LOOP
    INSERT INTO public.event_registration_members(registration_id,full_name,usn,college,department,year)
    VALUES(v_registration_id,BTRIM(v_member->>'full_name'),UPPER(BTRIM(v_member->>'usn')),v_college,v_department,v_year);
  END LOOP;

  RETURN jsonb_build_object(
    'registration_id',v_registration_id,
    'registration_code',v_code,
    'payment_required',v_event.payment_required,
    'payment_status',v_payment_status,
    'payment_portal_url',v_event.payment_portal_url,
    'payment_instructions',v_event.payment_instructions
  );
END; $$;

REVOKE ALL ON FUNCTION public.submit_event_registration(TEXT,JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_event_registration(TEXT,JSONB) TO anon, authenticated;

COMMIT;
