-- Supabase Schema for H Vitamin Drip

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Products Table
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  slug text not null unique,
  tagline text not null,
  description text not null,
  price numeric not null,
  duration text not null,
  category text not null,
  image text not null,
  featured boolean default false,
  ingredients text[] default '{}',
  benefits text[] default '{}'
);

-- Note: In a production environment, you would enable Row Level Security (RLS)
-- However, for the initial admin panel setup, we'll allow public reads of products
-- and restrict edits to authenticated users later.
alter table public.products enable row level security;

-- Create policy to allow anyone to read products
create policy "Allow public read access to products" 
  on public.products for select 
  using (true);

-- Create policy to allow authenticated users to manage products
create policy "Allow authenticated users to manage products" 
  on public.products for all 
  using (auth.role() = 'authenticated');


-- 2. Bookings Table
create table if not exists public.bookings (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  postcode text not null,
  preferred_date date,
  preferred_time text,
  notes text,
  status text default 'pending', -- pending, confirmed, completed, cancelled
  total_amount numeric not null,
  payment_method text not null -- online, whatsapp
);

alter table public.bookings enable row level security;

-- Allow public to insert bookings
create policy "Allow public to insert bookings" 
  on public.bookings for insert 
  with check (true);

-- Allow authenticated admins to view/manage bookings
create policy "Allow authenticated to manage bookings" 
  on public.bookings for all 
  using (auth.role() = 'authenticated');


-- 3. Booking Items Table (Many-to-Many linking bookings to products)
create table if not exists public.booking_items (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references public.bookings(id) on delete cascade not null,
  product_id uuid references public.products(id) not null,
  quantity integer not null default 1,
  price_at_booking numeric not null
);

alter table public.booking_items enable row level security;

create policy "Allow public to insert booking items" 
  on public.booking_items for insert 
  with check (true);

create policy "Allow authenticated to manage booking items" 
  on public.booking_items for all 
  using (auth.role() = 'authenticated');
