# Estratégia de autenticação e permissões

## Autenticação (Supabase Auth)
- Método inicial recomendado: **email + senha**.
- Sessão gerida por cookies HTTP-only no Next.js.
- Usuários vivem em `auth.users`; metadados de negócio ficam em `public.profiles`.

## Perfis suportados
- SDR
- Corretor
- Closer
- Gestor
- Admin

## Modelo de autorização
- Controle por **RBAC** (Role-Based Access Control) com tabela `public.profiles`.
- Campo `role` determina permissões.
- Políticas RLS filtram linhas por `responsavel_id` para perfis operacionais.

## Princípios de acesso
1. **SDR / Corretor / Closer**
   - Leitura e escrita apenas em registros próprios (ou explicitamente atribuídos).
2. **Gestor**
   - Leitura completa do time e atualização operacional.
3. **Admin**
   - Acesso total, incluindo configurações e gestão de usuários.

## Regras de segurança por módulo
- **Clientes:** operacionais veem clientes sob sua responsabilidade.
- **Interações:** operacionais veem interações dos próprios clientes.
- **Oportunidades:** operacionais veem oportunidades atribuídas a eles.
- **Tarefas:** operacionais veem tarefas cujo `responsavel_id = auth.uid()`.
- **Dashboard:**
  - Operacionais: métricas pessoais.
  - Gestor/Admin: visão agregada.

## Fluxo de onboarding de usuário
1. Admin cria convite/autorização no Supabase Auth.
2. Trigger cria `public.profiles` automaticamente.
3. Admin define papel (`role`) e, opcionalmente, vínculo de time.
4. Usuário acessa módulos conforme RLS.

## Estratégia de implementação no Next.js
- Middleware valida sessão e redireciona não autenticados para `/login`.
- Helpers de autorização (`lib/auth/permissions.ts`) centralizam guardas por papel.
- Componentes de página verificam permissão antes de renderizar ações críticas.

## Auditoria mínima
- Todas as tabelas com `created_at` e `updated_at`.
- Interações mantêm histórico cronológico de contato.
- Campo `updated_by` pode ser adicionado na fase 2 para trilha mais detalhada.
