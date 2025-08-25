-- Create grammar corrections table to store correction history
CREATE TABLE IF NOT EXISTS grammar_corrections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  original_text TEXT NOT NULL,
  corrected_text TEXT NOT NULL,
  tone VARCHAR(30) NOT NULL CHECK (tone IN ('formal', 'casual', 'friendly', 'persuasive', 'professional', 'creative', 'academic', 'conversational', 'seo-optimized', 'hook-generator', 'complete-rewrite')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_grammar_corrections_user_id ON grammar_corrections(user_id);
CREATE INDEX IF NOT EXISTS idx_grammar_corrections_created_at ON grammar_corrections(created_at);

-- Enable Row Level Security
ALTER TABLE grammar_corrections ENABLE ROW LEVEL SECURITY;

-- Create policies for grammar corrections
CREATE POLICY "Users can view own corrections" ON grammar_corrections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own corrections" ON grammar_corrections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own corrections" ON grammar_corrections
  FOR DELETE USING (auth.uid() = user_id);
