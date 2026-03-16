# CRM_AlvoBR

Base inicial do CRM interno da Alvo BR, com foco comercial.

## Stack
- Next.js (App Router)
- Supabase
- PostgreSQL
- Supabase Auth
- Deploy na Vercel

## Rodar localmente
1. Instale dependências:
   ```bash
   npm install
   ```
2. Copie variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```
3. Inicie o servidor:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:3000`.

## Deploy na Vercel
Defina estas variáveis no projeto Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Após isso, faça novo deploy.

## Estrutura atual
- Arquitetura: `docs/01-arquitetura.md`
- Auth/permissões: `docs/02-auth-e-permissoes.md`
- Schema SQL: `supabase/migrations/20260316_initial_crm_schema.sql`
