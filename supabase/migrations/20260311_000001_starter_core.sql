create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  creem_customer_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  creem_subscription_id text not null unique,
  creem_customer_id text,
  creem_product_id text not null,
  plan_key text not null,
  price_interval text check (price_interval in ('monthly', 'yearly')),
  status text not null,
  cancel_at_period_end boolean not null default false,
  current_period_start timestamptz,
  current_period_end timestamptz,
  trial_start timestamptz,
  trial_end timestamptz,
  canceled_at timestamptz,
  last_transaction_id text,
  last_event_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);
create index if not exists subscriptions_status_idx on public.subscriptions (status);

create table if not exists public.credit_balances (
  user_id uuid primary key references public.users(id) on delete cascade,
  balance integer not null default 0 check (balance >= 0),
  lifetime_earned integer not null default 0 check (lifetime_earned >= 0),
  lifetime_spent integer not null default 0 check (lifetime_spent >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.credit_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  kind text not null,
  amount integer not null,
  balance_after integer not null check (balance_after >= 0),
  source_key text not null unique,
  source_type text,
  source_id text,
  note text,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists credit_ledger_user_id_idx on public.credit_ledger (user_id, created_at desc);

create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  webhook_id text not null unique,
  event_type text not null,
  status text not null default 'processing' check (status in ('processing', 'processed', 'failed')),
  payload jsonb not null,
  error_message text,
  received_at timestamptz not null default now(),
  processed_at timestamptz
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
before update on public.users
for each row
execute function public.set_updated_at();

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at
before update on public.subscriptions
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture')
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        avatar_url = excluded.avatar_url,
        updated_at = now();

  insert into public.credit_balances (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_auth_user();

create or replace function public.grant_credits(
  p_user_id uuid,
  p_amount integer,
  p_kind text,
  p_source_key text,
  p_source_type text default null,
  p_source_id text default null,
  p_note text default null,
  p_metadata jsonb default '{}'::jsonb,
  p_created_by uuid default null
)
returns setof public.credit_ledger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_balance public.credit_balances%rowtype;
  v_existing public.credit_ledger%rowtype;
  v_inserted public.credit_ledger%rowtype;
begin
  if p_amount <= 0 then
    raise exception 'Grant amount must be positive';
  end if;

  select * into v_existing
  from public.credit_ledger
  where source_key = p_source_key;

  if found then
    return next v_existing;
    return;
  end if;

  insert into public.credit_balances (user_id)
  values (p_user_id)
  on conflict (user_id) do nothing;

  select * into v_balance
  from public.credit_balances
  where user_id = p_user_id
  for update;

  update public.credit_balances
  set balance = v_balance.balance + p_amount,
      lifetime_earned = lifetime_earned + p_amount,
      updated_at = now()
  where user_id = p_user_id
  returning * into v_balance;

  insert into public.credit_ledger (
    user_id,
    kind,
    amount,
    balance_after,
    source_key,
    source_type,
    source_id,
    note,
    metadata,
    created_by
  )
  values (
    p_user_id,
    p_kind,
    p_amount,
    v_balance.balance,
    p_source_key,
    p_source_type,
    p_source_id,
    p_note,
    coalesce(p_metadata, '{}'::jsonb),
    p_created_by
  )
  returning * into v_inserted;

  return next v_inserted;
end;
$$;

create or replace function public.consume_credits(
  p_user_id uuid,
  p_amount integer,
  p_kind text,
  p_source_key text,
  p_source_type text default null,
  p_source_id text default null,
  p_note text default null,
  p_metadata jsonb default '{}'::jsonb,
  p_created_by uuid default null
)
returns setof public.credit_ledger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_balance public.credit_balances%rowtype;
  v_existing public.credit_ledger%rowtype;
  v_inserted public.credit_ledger%rowtype;
begin
  if p_amount <= 0 then
    raise exception 'Consume amount must be positive';
  end if;

  select * into v_existing
  from public.credit_ledger
  where source_key = p_source_key;

  if found then
    return next v_existing;
    return;
  end if;

  insert into public.credit_balances (user_id)
  values (p_user_id)
  on conflict (user_id) do nothing;

  select * into v_balance
  from public.credit_balances
  where user_id = p_user_id
  for update;

  if v_balance.balance < p_amount then
    raise exception 'Insufficient credits';
  end if;

  update public.credit_balances
  set balance = v_balance.balance - p_amount,
      lifetime_spent = lifetime_spent + p_amount,
      updated_at = now()
  where user_id = p_user_id
  returning * into v_balance;

  insert into public.credit_ledger (
    user_id,
    kind,
    amount,
    balance_after,
    source_key,
    source_type,
    source_id,
    note,
    metadata,
    created_by
  )
  values (
    p_user_id,
    p_kind,
    -p_amount,
    v_balance.balance,
    p_source_key,
    p_source_type,
    p_source_id,
    p_note,
    coalesce(p_metadata, '{}'::jsonb),
    p_created_by
  )
  returning * into v_inserted;

  return next v_inserted;
end;
$$;

alter table public.users enable row level security;
alter table public.subscriptions enable row level security;
alter table public.credit_balances enable row level security;
alter table public.credit_ledger enable row level security;
alter table public.webhook_events enable row level security;

drop policy if exists "users_select_self" on public.users;
create policy "users_select_self"
on public.users
for select
using (auth.uid() = id);

drop policy if exists "users_update_self" on public.users;
create policy "users_update_self"
on public.users
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "subscriptions_select_self" on public.subscriptions;
create policy "subscriptions_select_self"
on public.subscriptions
for select
using (auth.uid() = user_id);

drop policy if exists "credit_balances_select_self" on public.credit_balances;
create policy "credit_balances_select_self"
on public.credit_balances
for select
using (auth.uid() = user_id);

drop policy if exists "credit_ledger_select_self" on public.credit_ledger;
create policy "credit_ledger_select_self"
on public.credit_ledger
for select
using (auth.uid() = user_id);
