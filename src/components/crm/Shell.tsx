import Link from 'next/link';

const menu = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/clientes', label: 'Clientes' },
  { href: '/interacoes', label: 'Interações' },
  { href: '/oportunidades', label: 'Oportunidades' },
  { href: '/tarefas', label: 'Tarefas' },
  { href: '/configuracoes', label: 'Configurações' }
];

export function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="crm-layout">
      <aside className="crm-sidebar">
        <h2>CRM Alvo BR</h2>
        <small className="muted">Operação Comercial</small>
        <nav>
          {menu.map((item) => (
            <Link key={item.href} href={item.href} className="crm-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="crm-content">
        <header className="crm-header">
          <h1>{title}</h1>
          <span className="badge">v1 interno</span>
        </header>
        {children}
      </section>
    </div>
  );
}
