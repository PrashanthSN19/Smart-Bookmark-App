-- Create the bookmarks table
create table bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  created_at timestamp with time zone default now()
);

-- Set up Row Level Security (RLS)
alter table bookmarks enable row level security;

-- Create policy to allow users to insert their own bookmarks
create policy "Users can insert their own bookmarks"
  on bookmarks for insert
  with check (auth.uid() = user_id);

-- Create policy to allow users to view their own bookmarks
create policy "Users can view their own bookmarks"
  on bookmarks for select
  using (auth.uid() = user_id);

-- Create policy to allow users to delete their own bookmarks
create policy "Users can delete their own bookmarks"
  on bookmarks for delete
  using (auth.uid() = user_id);

-- Enable Realtime
alter publication supabase_realtime add table bookmarks;
