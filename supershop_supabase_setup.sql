-- SuperShop Supabase starter schema
-- Run this in Supabase Dashboard -> SQL Editor.
-- Add your owner account to public.admins after creating it in Authentication.

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(12,2) not null check (price >= 0),
  icon text not null default 'tag',
  image_url text,
  cond text check (cond is null or cond in ('new','used')),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  items jsonb not null,
  total numeric(12,2) not null check (total >= 0),
  status text not null default 'new' check (status in ('new','del','done')),
  created_at timestamptz not null default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  owner_name text not null,
  item_name text not null,
  condition text not null check (condition in ('new','used')),
  asking_price numeric(12,2) not null check (asking_price > 0),
  note text,
  status text not null default 'pending' check (status in ('pending','accepted','rejected')),
  buy_price numeric(12,2),
  credited boolean not null default false,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists public.recharge_cards (
  code text primary key,
  amount numeric(12,2) not null check (amount > 0),
  used boolean not null default false,
  used_by text,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

alter table public.admins enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.offers enable row level security;
alter table public.recharge_cards enable row level security;

-- Admin membership is only readable by the signed-in user for their own row.
drop policy if exists admins_read_self on public.admins;
create policy admins_read_self on public.admins for select to authenticated using (user_id = auth.uid());

-- Products are public to browse, admin-only to change.
drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products for select to anon, authenticated using (true);
drop policy if exists products_admin_write on public.products;
create policy products_admin_write on public.products for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Orders: guests may submit an order; only admins may inspect/manage them.
drop policy if exists orders_submit on public.orders;
create policy orders_submit on public.orders for insert to anon, authenticated with check (true);
drop policy if exists orders_admin_access on public.orders;
create policy orders_admin_access on public.orders for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Offers can be submitted publicly and read by the storefront to display submitted offer status.
grant select on public.offers to anon, authenticated;
drop policy if exists offers_public_read on public.offers;
create policy offers_public_read on public.offers for select to anon, authenticated using (true);
drop policy if exists offers_submit on public.offers;
create policy offers_submit on public.offers for insert to anon, authenticated with check (status = 'pending' and credited = false and buy_price is null);
drop policy if exists offers_admin_access on public.offers;
create policy offers_admin_access on public.offers for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Cards: admin-only access. Redemption should be performed by a server-side/RPC flow,
-- not by exposing card rows or allowing public updates.
drop policy if exists cards_admin_access on public.recharge_cards;
create policy cards_admin_access on public.recharge_cards for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Do not grant anon/authenticated broad table privileges beyond what policies allow.
grant select on public.products to anon, authenticated;
grant insert on public.orders to anon, authenticated;
grant select, insert, update, delete on public.products to authenticated;
grant select, update on public.orders to authenticated;
grant insert on public.offers to anon, authenticated;
grant select, insert, update, delete on public.offers to authenticated;
grant select, insert, update, delete on public.recharge_cards to authenticated;

-- Atomically redeem one card without exposing card rows to anonymous users.
create or replace function public.redeem_card(card_code text, redeemer text)
returns numeric language plpgsql security definer set search_path=public as $$
declare card_amount numeric;
begin
  update public.recharge_cards
    set used=true, used_by=redeemer, used_at=now()
    where code=upper(card_code) and used=false
    returning amount into card_amount;
  if card_amount is null then raise exception 'Card invalid or already used'; end if;
  return card_amount;
end; $$;
grant execute on function public.redeem_card(text,text) to anon, authenticated;
