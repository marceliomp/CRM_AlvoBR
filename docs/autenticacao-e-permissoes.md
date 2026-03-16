# Estratégia de autenticação e permissões (Supabase Auth + RLS)

## 1) Modelo de identidade
- Usuários autenticam via **Supabase Auth** (email/senha no v1).
- Cada `auth.users.id` deve ter um registro em `public.profiles`.
- O perfil define o papel operacional: `sdr`, `corretor`, `closer`, `gestor`, `admin`.

## 2) Princípio de autorização
- **RLS ativado em todas as tabelas operacionais**.
- Princípio base: usuário comum enxerga/registra dados próprios (`owner_id = auth.uid()`).
- Gestor/Admin têm visibilidade ampliada.

## 3) Matriz de acesso resumida (v1)
- **SDR / Corretor / Closer**
  - CRUD nos próprios clientes, interações, oportunidades e tarefas.
  - Leitura limitada aos próprios registros.
- **Gestor**
  - Leitura de todos os registros da equipe.
  - Escrita permitida em toda operação comercial.
- **Admin**
  - Acesso total (inclui configurações e gestão de usuários).

## 4) Funções auxiliares recomendadas para RLS
Criar funções SQL estáveis para reutilizar nas policies:
- `public.current_user_role()` → retorna `user_role` do `auth.uid()`.
- `public.is_manager_or_admin()` → `true` para `gestor` e `admin`.
- `public.can_access_owner(owner_id uuid)` → true se `owner_id = auth.uid()` ou manager/admin.

## 5) Policies por tabela (diretriz)

### profiles
- Usuário lê próprio perfil.
- Admin pode ler/editar todos.

### clients
- `select`: dono, gestor ou admin.
- `insert`: autenticado com `created_by = auth.uid()` e `owner_id` válido.
- `update/delete`: dono, gestor ou admin.

### interactions
- `select/insert/update/delete`: por acesso ao `owner_id` e/ou cliente associado, com exceção de gestor/admin que podem tudo.

### opportunities
- Mesmo padrão de `clients`, respeitando `owner_id`.

### tasks
- Mesmo padrão de `clients`, respeitando `owner_id`.

## 6) Fluxo de provisionamento de usuário
1. Admin cria convite/credencial no Supabase Auth.
2. Trigger/função cria `public.profiles` automaticamente (ou processo administrativo inicial).
3. Admin ajusta `role` e `active`.
4. Usuário acessa o sistema e recebe escopo conforme RLS.

## 7) Regras de segurança adicionais
- Nunca usar chave `service_role` no client-side.
- Rotas server-side usam client seguro por contexto.
- Registrar auditoria de alterações sensíveis (futuro v1.1).
- Validar `active = true` para bloquear contas inativas.
