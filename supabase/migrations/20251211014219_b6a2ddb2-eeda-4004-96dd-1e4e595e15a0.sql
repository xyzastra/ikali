-- Step 1: Fix contact_submissions Admin SELECT Policy
DROP POLICY IF EXISTS "Admins can view contact submissions" ON contact_submissions;

CREATE POLICY "Admins can view contact submissions" 
ON contact_submissions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Step 2: Create Audit Log Table for Admin Access
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid NOT NULL,
  action text NOT NULL,
  table_name text NOT NULL,
  record_count integer,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view audit logs"
ON admin_audit_log FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users can insert audit logs"
ON admin_audit_log FOR INSERT
TO authenticated
WITH CHECK (admin_user_id = auth.uid());

-- Step 3: Clean up duplicate Users table policy
DROP POLICY IF EXISTS "Users can only insert their own record" ON "Users";

-- Step 4: Add Database-Level Rate Limiting for Contact Submissions
CREATE OR REPLACE FUNCTION check_contact_submission_rate()
RETURNS TRIGGER AS $$
DECLARE
  recent_count integer;
BEGIN
  SELECT COUNT(*) INTO recent_count
  FROM contact_submissions
  WHERE ip_address = NEW.ip_address
  AND created_at > NOW() - INTERVAL '1 hour';
  
  IF recent_count >= 5 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS enforce_contact_rate_limit ON contact_submissions;

CREATE TRIGGER enforce_contact_rate_limit
BEFORE INSERT ON contact_submissions
FOR EACH ROW
EXECUTE FUNCTION check_contact_submission_rate();