# Arquitetura do CRM Alvo BR (v1)

## 1) Objetivo do produto
CRM web interno focado em operação comercial da Alvo BR (captação, relacionamento, avanço de oportunidades e gestão de rotina da equipe), sem funcionalidades de gestão imobiliária pesada.

## 2) Stack obrigatória e decisões
- **Frontend/Backend BFF:** Next.js (App Router)
- **Banco e Backend as a Service:** Supabase (PostgreSQL + Auth + RLS)
- **Banco relacional:** PostgreSQL (no Supabase)
- **Autenticação:** Supabase Auth
- **Deploy:** Vercel

### Decisão arquitetural
Adotar uma arquitetura **modular monolítica**:
- Um único projeto Next.js para UI + server actions/api routes.
- Supabase como camada de dados/autenticação.
- RLS para autorização no nível de dados.
- Módulos desacoplados por domínio para facilitar evolução futura.

## 3) Domínios e módulos (v1)
1. **Clientes**
2. **Interações**
3. **Oportunidades**
4. **Tarefas**
5. **Dashboard**
6. **Configurações básicas**

## 4) Camadas do sistema

### Camada de apresentação (Next.js)
- Telas por módulo com componentes reutilizáveis.
- Tema institucional com as cores: **azul petróleo, verde petróleo, branco e preto**.
- Controle de acesso por perfil para rotas sensíveis.

### Camada de aplicação (Next.js server actions / route handlers)
- Orquestra casos de uso (ex.: criar cliente + gerar oportunidade inicial).
- Validação de entrada (schema validation).
- Logs de ações críticas.

### Camada de dados (Supabase/PostgreSQL)
- Tabelas relacionais com auditoria (`created_at`, `updated_at`).
- Enum para pipeline e campos categóricos.
- Índices para busca operacional e dashboard.
- RLS para isolamento e governança por perfil.

## 5) Pipeline comercial obrigatório
1. Lead entrou
2. Sem contato
3. Contatado
4. Qualificado
5. Reunião agendada
6. Atendimento realizado
7. Proposta enviada
8. Negociação
9. Ganhou
10. Perdeu

## 6) Fluxo operacional base
1. Lead entra em **Clientes** com dados mínimos.
2. SDR/Corretor registra **Interações**.
3. Cliente progride em **Oportunidades** no pipeline.
4. Equipe cria/acompanha **Tarefas** com prazos.
5. **Dashboard** consolida KPIs operacionais.

## 7) Organização técnica recomendada (Next.js)
- `app/(auth)` → login e recuperação
- `app/(crm)/clientes`
- `app/(crm)/interacoes`
- `app/(crm)/oportunidades`
- `app/(crm)/tarefas`
- `app/(crm)/dashboard`
- `app/(crm)/configuracoes`
- `lib/supabase` → clients browser/server
- `lib/auth` → guardas de perfil
- `lib/validators` → schemas de validação
- `lib/repositories` → acesso a dados por domínio

## 8) Princípios de v1
- Priorizar execução comercial diária.
- Evitar features não essenciais.
- Começar pelo núcleo: **schema + auth + módulos principais + dashboard**.
- Entregas incrementais e verificáveis.
