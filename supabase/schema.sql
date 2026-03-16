-- CRM Alvo BR - Schema inicial (v1)
-- Ordem: tipos -> tabelas -> índices -> trigger updated_at -> funções utilitárias RLS

create extension if not exists pgcrypto;

-- =====================================================
-- ENUMS
-- =====================================================

do $$ begin
  create type public.user_role as enum ('sdr', 'corretor', 'closer', 'gestor', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
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
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.lead_temperature as enum ('frio', 'morno', 'quente');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.interaction_type as enum ('ligacao', 'whatsapp', 'email', 'reuniao', 'outro');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.task_priority as enum ('baixa', 'media', 'alta');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.task_status as enum ('pendente', 'em_andamento', 'concluida', 'cancelada');
exception when duplicate_object then null; end $$;

-- =====================================================
-- PERFIS (vinculados ao auth.users)
-- =====================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role public.user_role not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================
-- CLIENTES
-- =====================================================

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  lead_source text,
  city text,
  primary_interest text,
  purchase_goal text,
  down_payment_range text,
  monthly_capacity numeric(12,2),
  purchase_timeline text,
  temperature public.lead_temperature,
  owner_id uuid not null references public.profiles(id),
  last_interaction_at timestamptz,
  next_action text,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================
-- INTERAÇÕES
-- =====================================================

create table if not exists public.interactions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  interaction_type public.interaction_type not null,
  interaction_date timestamptz not null,
  owner_id uuid not null references public.profiles(id),
  summary text not null,
  next_action text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================
-- OPORTUNIDADES
-- =====================================================

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  stage public.pipeline_stage not null default 'lead_entrou',
  estimated_value numeric(14,2),
  product_interest text,
  closing_probability smallint check (closing_probability between 0 and 100),
  expected_close_date date,
  loss_reason text,
  owner_id uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================
-- TAREFAS
-- =====================================================

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client_id uuid references public.clients(id) on delete set null,
  owner_id uuid not null references public.profiles(id),
  due_date timestamptz not null,
  priority public.task_priority not null default 'media',
  status public.task_status not null default 'pendente',
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================
-- ÍNDICES
-- =====================================================

create index if not exists idx_clients_owner_id on public.clients(owner_id);
create index if not exists idx_clients_email on public.clients(email);
create index if not exists idx_clients_phone on public.clients(phone);
create index if not exists idx_clients_created_at on public.clients(created_at desc);

create index if not exists idx_interactions_client_id on public.interactions(client_id);
create index if not exists idx_interactions_owner_id on public.interactions(owner_id);
create index if not exists idx_interactions_date on public.interactions(interaction_date desc);

create index if not exists idx_opportunities_client_id on public.opportunities(client_id);
create index if not exists idx_opportunities_owner_id on public.opportunities(owner_id);
create index if not exists idx_opportunities_stage on public.opportunities(stage);
create index if not exists idx_opportunities_expected_close on public.opportunities(expected_close_date);

create index if not exists idx_tasks_owner_id on public.tasks(owner_id);
create index if not exists idx_tasks_due_date on public.tasks(due_date);
create index if not exists idx_tasks_status on public.tasks(status);

-- =====================================================
-- TRIGGER updated_at
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

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_clients_updated_at on public.clients;
create trigger trg_clients_updated_at
before update on public.clients
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_interactions_updated_at on public.interactions;
create trigger trg_interactions_updated_at
before update on public.interactions
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_opportunities_updated_at on public.opportunities;
create trigger trg_opportunities_updated_at
before update on public.opportunities
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_tasks_updated_at on public.tasks;
create trigger trg_tasks_updated_at
before update on public.tasks
for each row execute procedure public.set_updated_at();
