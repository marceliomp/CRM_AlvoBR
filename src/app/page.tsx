import { getSupabaseEnv } from '@/lib/supabase/env';

const pipeline = [
  'Lead entrou',
  'Sem contato',
  'Contatado',
  'Qualificado',
  'Reunião agendada',
  'Atendimento realizado',
  'Proposta enviada',
  'Negociação',
  'Ganhou',
  'Perdeu'
];

export default function HomePage() {
  const { isConfigured, url } = getSupabaseEnv();

  return (
    <main className="container">
      <div className="badge">CRM Alvo BR · v1 bootstrap</div>
      <h1>Deploy pronto na Vercel ✅</h1>
      <p>
        Esta versão corrige o erro <strong>404 NOT_FOUND</strong> criando uma aplicação Next.js funcional, com
        base para autenticação Supabase e os módulos comerciais do CRM.
      </p>

      <section className="grid" style={{ marginTop: 20 }}>
        <article className="card kpi">
          <h3>Status do app</h3>
          <p>Rota raiz (`/`) ativa e renderizando com App Router.</p>
        </article>
        <article className="card">
          <h3>Supabase</h3>
          <p>{isConfigured ? 'Configurado' : 'Pendente de variáveis de ambiente'}</p>
          <small className="muted">URL: {url ?? 'não definida'}</small>
        </article>
        <article className="card">
          <h3>Próxima etapa</h3>
          <p>Implementar login com Supabase Auth e telas de módulos.</p>
        </article>
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <h2>Pipeline comercial obrigatório</h2>
        <ol>
          {pipeline.map((stage) => (
            <li key={stage}>{stage}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
