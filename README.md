# CRM_AlvoBR

Base inicial de arquitetura e dados do CRM interno da Alvo BR.

## Etapa 1 — Arquitetura
- Documento: `docs/01-arquitetura.md`

## Etapa 2 — Schema de banco
- Migração SQL: `supabase/migrations/20260316_initial_crm_schema.sql`

## Etapa 3 — Autenticação e permissões
- Documento: `docs/02-auth-e-permissoes.md`

## Etapa 4 — Bootstrap Next.js para deploy na Vercel
Este repositório agora inclui uma aplicação Next.js funcional para eliminar erro `404 NOT_FOUND` em deploy sem código de app.

### Rodar localmente
1. Instale dependências:
   ```bash
   npm install
   ```
2. Crie o arquivo `.env.local` com base em `.env.example`.
3. Rode o app:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:3000`.

### Variáveis obrigatórias
```env
NEXT_PUBLIC_SUPABASE_URL=https://wozytqewzczlhokqhjju.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Deploy na Vercel
- Framework: Next.js (detectado automaticamente)
- Build command: `npm run build`
- Output: padrão do Next.js
- Configure as duas variáveis de ambiente acima no projeto da Vercel.
