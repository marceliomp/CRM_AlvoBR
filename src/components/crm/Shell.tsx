'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthGate } from '@/components/auth/AuthGate';
import { getBrowserSupabaseClient } from '@/lib/supabase/browser';

const menu = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/clientes', label: 'Clientes' },
  { href: '/interacoes', label: 'Interações' },
  { href: '/oportunidades', label: 'Oportunidades' },
  { href: '/tarefas', label: 'Tarefas' },
  { href: '/configuracoes', label: 'Configurações' }
];

export function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const onLogout = async () => {
    const supabase = getBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.replace('/login');
  };

  return (
    <AuthGate onUserChange={setUserEmail}>
      <div className="crm-layout">
        <aside className="crm-sidebar">
          <h2>CRM Alvo BR</h2>
          <small className="muted">Operação Comercial</small>
          <nav>
            {menu.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`crm-link ${active ? 'active' : ''}`}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <section className="crm-content">
          <header className="crm-header">
            <div>
              <h1>{title}</h1>
              <small className="muted">{userEmail ?? 'Usuário autenticado'}</small>
            </div>
            <div className="header-actions">
              <span className="badge">v1 interno</span>
              <button onClick={onLogout} className="logout-btn" type="button">
                Sair
              </button>
            </div>
          </header>
          {children}
        </section>
      </div>
    </AuthGate>
  );
}
