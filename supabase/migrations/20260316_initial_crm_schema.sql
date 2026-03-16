-- CRM Alvo BR - schema inicial (v1)
-- Ordem: tipos -> tabelas -> índices -> RLS -> policies -> triggers

create extension if not exists pgcrypto;

-- =====================================================
-- Tipos
-- =====================================================
create type public.app_role as enum ('sdr', 'corretor', 'closer', 'gestor', 'admin');
create type public.pipeline_stage as enum (
  'lead_entrou',
  'sem_contato',
  'contatado',
  'qualificado',
  'reuniao_agendada',
  'atendimento_realizado',
  'proposta_enviada',
  'negociacao',
  'ganhou',
  'perdeu'
);
create type public.temperatura_lead as enum ('frio', 'morno', 'quente');
create type public.interaction_type as enum ('ligacao', 'whatsapp', 'email', 'reuniao', 'outro');
create type public.task_priority as enum ('baixa', 'media', 'alta');
create type public.task_status as enum ('pendente', 'em_andamento', 'concluida', 'cancelada');

-- =====================================================
-- Perfis
-- =====================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.app_role not null default 'sdr',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================
-- Clientes
-- =====================================================
create table if not exists public.clientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  telefone text,
  email text,
  origem_lead text,
  cidade text,
  interesse_principal text,
  objetivo_compra text,
  faixa_entrada numeric(14,2),
  capacidade_mensal numeric(14,2),
  prazo_compra text,
  temperatura public.temperatura_lead,
  responsavel_id uuid not null references public.profiles(id),
  ultima_interacao_em timestamptz,
  proxima_acao text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_clientes_responsavel on public.clientes(responsavel_id);
create index if not exists idx_clientes_origem_lead on public.clientes(origem_lead);

-- =====================================================
-- Interações
-- =====================================================
create table if not exists public.interacoes (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references public.clientes(id) on delete cascade,
  tipo public.interaction_type not null,
  data_interacao timestamptz not null default now(),
  responsavel_id uuid not null references public.profiles(id),
  resumo text not null,
  proxima_acao text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_interacoes_cliente on public.interacoes(cliente_id);
create index if not exists idx_interacoes_responsavel on public.interacoes(responsavel_id);
create index if not exists idx_interacoes_data on public.interacoes(data_interacao desc);

-- =====================================================
-- Oportunidades
-- =====================================================
create table if not exists public.oportunidades (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references public.clientes(id) on delete cascade,
  estagio public.pipeline_stage not null default 'lead_entrou',
  valor_estimado numeric(14,2),
  produto_interesse text,
  probabilidade_fechamento integer check (probabilidade_fechamento between 0 and 100),
  data_prevista date,
  motivo_perda text,
  responsavel_id uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_oportunidades_cliente on public.oportunidades(cliente_id);
create index if not exists idx_oportunidades_estagio on public.oportunidades(estagio);
create index if not exists idx_oportunidades_responsavel on public.oportunidades(responsavel_id);

-- =====================================================
-- Tarefas
-- =====================================================
create table if not exists public.tarefas (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  cliente_id uuid references public.clientes(id) on delete set null,
  responsavel_id uuid not null references public.profiles(id),
  vencimento timestamptz not null,
  prioridade public.task_priority not null default 'media',
  status public.task_status not null default 'pendente',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_tarefas_responsavel on public.tarefas(responsavel_id);
create index if not exists idx_tarefas_vencimento on public.tarefas(vencimento);
create index if not exists idx_tarefas_status on public.tarefas(status);

-- =====================================================
-- Triggers auxiliares
-- =====================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

create trigger trg_clientes_updated_at
before update on public.clientes
for each row execute procedure public.set_updated_at();

create trigger trg_interacoes_updated_at
before update on public.interacoes
for each row execute procedure public.set_updated_at();

create trigger trg_oportunidades_updated_at
before update on public.oportunidades
for each row execute procedure public.set_updated_at();

create trigger trg_tarefas_updated_at
before update on public.tarefas
for each row execute procedure public.set_updated_at();

-- Cria profile automaticamente ao criar usuário no auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email))
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- =====================================================
-- RLS e policies
-- =====================================================
alter table public.profiles enable row level security;
alter table public.clientes enable row level security;
alter table public.interacoes enable row level security;
alter table public.oportunidades enable row level security;
alter table public.tarefas enable row level security;

create or replace function public.current_user_role()
returns public.app_role
language sql
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- Profiles
create policy "profiles_self_or_admin_read"
on public.profiles
for select
using (id = auth.uid() or public.current_user_role() in ('admin', 'gestor'));

create policy "profiles_self_update"
on public.profiles
for update
using (id = auth.uid())
with check (id = auth.uid());

-- Clientes
create policy "clientes_read_own_or_management"
on public.clientes
for select
using (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
);

create policy "clientes_insert_own_or_management"
on public.clientes
for insert
with check (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
);

create policy "clientes_update_own_or_management"
on public.clientes
for update
using (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
)
with check (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
);

-- Interações
create policy "interacoes_read_own_or_management"
on public.interacoes
for select
using (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
);

create policy "interacoes_insert_own_or_management"
on public.interacoes
for insert
with check (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
);

create policy "interacoes_update_own_or_management"
on public.interacoes
for update
using (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
)
with check (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
);

-- Oportunidades
create policy "oportunidades_read_own_or_management"
on public.oportunidades
for select
using (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
);

create policy "oportunidades_insert_own_or_management"
on public.oportunidades
for insert
with check (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
);

create policy "oportunidades_update_own_or_management"
on public.oportunidades
for update
using (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
)
with check (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
);

-- Tarefas
create policy "tarefas_read_own_or_management"
on public.tarefas
for select
using (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
);

create policy "tarefas_insert_own_or_management"
on public.tarefas
for insert
with check (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
);

create policy "tarefas_update_own_or_management"
on public.tarefas
for update
using (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
)
with check (
  responsavel_id = auth.uid()
  or public.current_user_role() in ('admin', 'gestor')
);
