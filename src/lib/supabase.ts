import { createClient } from '@supabase/supabase-js';

// Public, read-only project: RLS restricts every content table to SELECT-only for the anon
// role, so this key is safe to ship in the client bundle. All writes go through the
// password-gated `admin_write` Postgres function used by the admin dashboard instead.
const SUPABASE_URL = 'https://mfvdkcbeleqazzjlqxhe.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_LiI3-1ZkgY6ywX8o4E882A_DMKPXRqM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
