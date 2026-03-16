import { Shell } from '@/components/crm/Shell';

const perfis = ['SDR', 'Corretor', 'Closer', 'Gestor', 'Admin'];

export default function ConfiguracoesPage() {
  return (
    <Shell title="Configurações básicas">
      <section className="grid">
        <article className="card">
          <h3>Perfis de acesso</h3>
          <ul>
            {perfis.map((perfil) => (
              <li key={perfil}>{perfil}</li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h3>Integrações</h3>
          <p>Supabase Auth e PostgreSQL habilitados no projeto.</p>
        </article>

        <article className="card">
          <h3>Próximo passo</h3>
          <p>Substituir dados mock por leitura direta das tabelas com RLS.</p>
        </article>
      </section>
    </Shell>
  );
}
