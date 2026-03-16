import { getSupabaseConfigFromEnv } from "./client";

export async function checkSupabaseHealth() {
  const { url, anonKey } = getSupabaseConfigFromEnv();

  const response = await fetch(`${url}/rest/v1/`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`
    },
    cache: "no-store"
  });

  return {
    ok: response.ok,
    status: response.status
  };
}
