-- Supabase Schema for 10301351 Data Science Study App
-- Handles optional cloud synchronization of user mastery, exam attempts, and scratchpad

-- Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  student_id TEXT,
  display_name TEXT,
  target_grade TEXT DEFAULT 'A',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Module Completion Progress
CREATE TABLE IF NOT EXISTS public.user_module_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  module_id TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, module_id)
);

-- Formula Mastery Progress
CREATE TABLE IF NOT EXISTS public.user_formula_mastery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  formula_id TEXT NOT NULL,
  mastery_level INT DEFAULT 0, -- 0 = unseen, 1 = reviewed, 2 = practiced, 3 = mastered
  last_practiced_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, formula_id)
);

-- Exam Attempts & Diagnostics
CREATE TABLE IF NOT EXISTS public.user_exam_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  time_spent_seconds INT,
  answers_json JSONB,
  diagnostic_weaknesses TEXT[],
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_formula_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_exam_attempts ENABLE ROW LEVEL SECURITY;
