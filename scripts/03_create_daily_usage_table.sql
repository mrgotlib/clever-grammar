-- Create daily usage tracking table to enforce 30 requests per day limit
CREATE TABLE IF NOT EXISTS daily_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  usage_date DATE DEFAULT CURRENT_DATE,
  request_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one record per user per day
  UNIQUE(user_id, usage_date)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_daily_usage_user_date ON daily_usage(user_id, usage_date);

-- Enable Row Level Security
ALTER TABLE daily_usage ENABLE ROW LEVEL SECURITY;

-- Create policies for daily usage
CREATE POLICY "Users can view own usage" ON daily_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage" ON daily_usage
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage" ON daily_usage
  FOR UPDATE USING (auth.uid() = user_id);
