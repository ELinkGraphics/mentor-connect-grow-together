
-- This SQL file contains commands to enable real-time functionality for the Supabase tables
-- These commands are for reference and should be run in the Supabase SQL editor

-- Enable REPLICA IDENTITY FULL for mentorships table to ensure full row data is available
ALTER TABLE public.mentorships REPLICA IDENTITY FULL;

-- Add mentorships table to the supabase_realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.mentorships;

-- Enable REPLICA IDENTITY FULL for sessions table
ALTER TABLE public.sessions REPLICA IDENTITY FULL;

-- Add sessions table to the supabase_realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.sessions;

-- Enable REPLICA IDENTITY FULL for messages table
ALTER TABLE public.messages REPLICA IDENTITY FULL;

-- Add messages table to the supabase_realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Enable REPLICA IDENTITY FULL for profiles table
ALTER TABLE public.profiles REPLICA IDENTITY FULL;

-- Add profiles table to the supabase_realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;

-- Enable REPLICA IDENTITY FULL for chats table
ALTER TABLE public.chats REPLICA IDENTITY FULL;

-- Add chats table to the supabase_realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.chats;
