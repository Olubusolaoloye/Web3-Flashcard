import { createClient } from '@supabase/supabase-js';

// The publishable (anon) key is safe in a client bundle: RLS grants anon SELECT only.
// Every write goes through the `admin_write` Postgres function, which is gated on a
// bcrypt-hashed password stored in `admin_settings` (a table with RLS on and no
// policies, so it is unreadable from any client). No service_role key exists here.
const SUPABASE_URL = 'https://mfvdkcbeleqazzjlqxhe.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_LiI3-1ZkgY6ywX8o4E882A_DMKPXRqM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
