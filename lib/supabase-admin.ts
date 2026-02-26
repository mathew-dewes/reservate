import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabaseAdmin = createClient(process.env.SUPABASE_URL!, process.env.SERIVCE_ROLE_KEY!)