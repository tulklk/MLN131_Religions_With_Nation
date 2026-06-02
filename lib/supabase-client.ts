'use client'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

export const supabaseClient =
  supabaseUrl && publishableKey
    ? createClient(supabaseUrl, publishableKey)
    : null
