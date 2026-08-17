import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://pkjfaqkfxsdhnbzowjwv.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_cVH8azRh0aMUyCSmBMoc5A_yizBokKd';

export const supabase = createClient(supabaseUrl, supabaseKey);
