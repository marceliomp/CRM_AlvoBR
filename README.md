# CRM_AlvoBR

Base inicial de arquitetura e dados do CRM interno da Alvo BR.

## Etapa 1 — Arquitetura
- Documento: `docs/01-arquitetura.md`

## Etapa 2 — Schema de banco
- Migração SQL: `supabase/migrations/20260316_initial_crm_schema.sql`

## Etapa 3 — Autenticação e permissões
- Documento: `docs/02-auth-e-permissoes.md`

## Etapa 4 — Bootstrap Next.js para deploy na Vercel
Este repositório inclui uma aplicação Next.js funcional para eliminar erro `404 NOT_FOUND` em deploy sem código de app.

## Etapa 5 — Hardening do deploy Vercel
Foram adicionados:
- `vercel.json` para forçar framework/build corretos.
- `engines.node` no `package.json`.
- Endpoint de diagnóstico: `GET /api/health`.

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
5. Teste saúde:
   - `http://localhost:3000/api/health`

### Variáveis obrigatórias
```env
NEXT_PUBLIC_SUPABASE_URL=https://wozytqewzczlhokqhjju.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Deploy na Vercel (checagem anti-404)
1. **Root Directory** deve ser `/` (raiz do repositório).
2. Framework deve estar como **Next.js** (agora também forçado no `vercel.json`).
3. Build command: `npm run build`.
4. Não definir Output Directory manual para projetos Next.js.
5. Configurar variáveis de ambiente (`NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
6. Após deploy, validar:
   - `/` (home)
   - `/api/health` (deve retornar JSON com `status: ok`)

Se `/api/health` responder e `/` não, o problema é de rota/render.
Se ambos derem 404, o problema é configuração do projeto no painel da Vercel (normalmente Root Directory/Project link).


## Interface CRM inicial (já navegável)
Após deploy, o sistema abre no Dashboard do CRM (não mais na tela de bootstrap), com módulos:
- `/dashboard`
- `/clientes`
- `/interacoes`
- `/oportunidades`
- `/tarefas`
- `/configuracoes`

> Nesta fase os dados exibidos são mockados para validar UX/estrutura.
> Próximo passo: conectar cada módulo às tabelas Supabase com Auth + RLS.


## Autenticação de usuário (Supabase Auth)
- Tela de login: `/login`
- Rotas do CRM protegidas por sessão (`/dashboard`, `/clientes`, `/interacoes`, `/oportunidades`, `/tarefas`, `/configuracoes`).
- Logout disponível no cabeçalho do CRM.

### Configuração obrigatória na Vercel
```env
NEXT_PUBLIC_SUPABASE_URL=https://wozytqewzczlhokqhjju.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key-do-projeto>
```

### Como criar usuário
1. Acesse Supabase Dashboard > Authentication > Users.
2. Crie usuário com email e senha.
3. Faça login em `/login` para acessar o CRM.
