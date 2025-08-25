-- Function to increment daily usage count
CREATE OR REPLACE FUNCTION increment_daily_usage(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  current_count INTEGER;
BEGIN
  -- Insert or update daily usage record
  INSERT INTO daily_usage (user_id, usage_date, request_count)
  VALUES (p_user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, usage_date)
  DO UPDATE SET 
    request_count = daily_usage.request_count + 1,
    updated_at = NOW()
  RETURNING request_count INTO current_count;
  
  RETURN current_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get current daily usage
CREATE OR REPLACE FUNCTION get_daily_usage(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  current_count INTEGER;
BEGIN
  SELECT COALESCE(request_count, 0) INTO current_count
  FROM daily_usage
  WHERE user_id = p_user_id AND usage_date = CURRENT_DATE;
  
  RETURN COALESCE(current_count, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can make more requests
CREATE OR REPLACE FUNCTION can_make_request(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  current_count INTEGER;
  has_access BOOLEAN;
BEGIN
  -- Check if user has lifetime access
  SELECT has_lifetime_access INTO has_access
  FROM users
  WHERE id = p_user_id;
  
  -- If no lifetime access, deny request
  IF NOT has_access THEN
    RETURN FALSE;
  END IF;
  
  -- Get current usage
  SELECT get_daily_usage(p_user_id) INTO current_count;
  
  -- Check if under daily limit (30 requests)
  RETURN current_count < 30;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
