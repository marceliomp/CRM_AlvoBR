# Arquitetura do CRM Alvo BR (v1)

## Objetivo
CRM interno focado em gestão comercial: leads, clientes, interações, oportunidades, tarefas e indicadores operacionais.

## Stack obrigatória
- **Front-end e back-end web:** Next.js (App Router)
- **Banco e APIs:** Supabase + PostgreSQL
- **Autenticação:** Supabase Auth
- **Deploy:** Vercel

## Diretrizes de arquitetura
1. **Simplicidade operacional no v1:** sem módulos imobiliários pesados.
2. **Monolito modular:** um único projeto Next.js com separação clara por domínio.
3. **Dados primeiro:** schema e RLS definidos antes de telas.
4. **Observabilidade mínima:** logs de interação e timestamps em todas as entidades principais.

## Visão de alto nível
- **Client (Next.js):** páginas para SDR, Corretor, Closer, Gestor e Admin.
- **Server (Next.js Route Handlers / Server Actions):** operações de leitura/escrita com validação.
- **Supabase:**
  - PostgreSQL (schema relacional)
  - Auth (login e sessão)
  - RLS + policies por perfil

## Módulos v1
1. Clientes
2. Interações
3. Oportunidades
4. Tarefas
5. Dashboard
6. Configurações básicas

## Organização sugerida do projeto Next.js

```txt
src/
  app/
    (auth)/login
    (app)/dashboard
    (app)/clientes
    (app)/interacoes
    (app)/oportunidades
    (app)/tarefas
    (app)/configuracoes
  components/
    ui/
    clientes/
    interacoes/
    oportunidades/
    tarefas/
    dashboard/
  lib/
    supabase/
      client.ts
      server.ts
    auth/
      permissions.ts
    validations/
      clientes.ts
      interacoes.ts
      oportunidades.ts
      tarefas.ts
```

## Fluxo principal de dados
1. Lead entra no sistema (cliente + oportunidade inicial).
2. SDR realiza contato e registra interações.
3. Oportunidade avança no pipeline comercial.
4. Tarefas sustentam follow-ups e próximas ações.
5. Dashboard consolida métricas por origem, responsável e estágio.

## Padrão visual (identidade solicitada)
- **Azul petróleo:** cor principal de navegação e destaque.
- **Verde petróleo:** estado positivo e progresso.
- **Branco:** fundo/base.
- **Preto:** tipografia principal.

> Sugestão inicial de tokens:
> - `--color-primary: #0F4C5C` (azul petróleo)
> - `--color-success: #1D7874` (verde petróleo)
> - `--color-bg: #FFFFFF`
> - `--color-text: #111111`
