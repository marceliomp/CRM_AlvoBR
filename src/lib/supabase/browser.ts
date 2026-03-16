'use client';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getSupabaseEnv } from './env';

let supabaseSingleton: ReturnType<typeof createSupabaseClient> | null = null;

export function getBrowserSupabaseClient() {
  if (supabaseSingleton) {
    return supabaseSingleton;
  }

  const { url, anonKey } = getSupabaseEnv();

  if (!url || !anonKey) {
    throw new Error('Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }

  supabaseSingleton = createSupabaseClient(url, anonKey);
  return supabaseSingleton;
}
