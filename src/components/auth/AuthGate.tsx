'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getBrowserSupabaseClient } from '@/lib/supabase/browser';

type AuthGateProps = {
  children: React.ReactNode;
  onUserChange?: (email: string | null) => void;
};

export function AuthGate({ children, onUserChange }: AuthGateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getBrowserSupabaseClient();

    const validate = async () => {
      const { data } = await supabase.auth.getSession();
      const email = data.session?.user?.email ?? null;
      onUserChange?.(email);

      if (!data.session) {
        router.replace(`/login?next=${encodeURIComponent(pathname || '/dashboard')}`);
      } else {
        setLoading(false);
      }
    };

    validate();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      onUserChange?.(session?.user?.email ?? null);
      if (!session) {
        router.replace('/login');
      }
    });

    return () => sub.subscription.unsubscribe();
  }, [onUserChange, pathname, router]);

  if (loading) {
    return <div className="card">Validando sessão...</div>;
  }

  return <>{children}</>;
}
