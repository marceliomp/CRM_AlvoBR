import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="card">
        <span className="badge">Deploy OK</span>
        <h1>CRM Alvo BR</h1>
        <p>
          Aplicação base em Next.js publicada para evitar erro 404 na Vercel e preparar a evolução dos módulos
          comerciais.
        </p>
        <p>
          Stack: Next.js + Supabase + PostgreSQL + Supabase Auth.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn" href="/login">
            Entrar
          </Link>
          <Link className="btn" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
