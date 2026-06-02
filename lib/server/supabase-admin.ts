import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

const supabaseServerKey = serviceRoleKey || publishableKey

if (!supabaseServerKey) {
  throw new Error('Missing server Supabase key. Set SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY')
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServerKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})
