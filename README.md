# Smart Bookmark App

A production-ready bookmark manager built with Next.js 14, Supabase, and Tailwind CSS.
Features Google OAuth authentication, private per-user bookmarks, and real-time updates across devices.

## Features

- **Google OAuth Authentication**: Secure login via Supabase Auth.
- **Private Bookmarks**: Row Level Security (RLS) ensures data privacy.
- **Real-time Updates**: Changes sync instantly across tabs/devices.
- **Responsive UI**: Clean, mobile-friendly interface with Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database & Auth**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS (v4)
- **Deployment**: Vercel

## Setup Instructions

### 1. Clone & Install
```bash
git clone <repo-url>
cd smart-bookmark-app
npm install
```

### 2. Supabase Configuration

1. Create a new Supabase project.
2. Go to **Authentication -> Providers** and enable **Google**.
   - You will need to set up Google Cloud OAuth credentials (Client ID and Secret).
   - Add the Supabase Redirect URL to your Google Cloud Console Authorized Redirect URIs.
3. Go to **SQL Editor** and run the contents of [`schema.sql`](./schema.sql) to create the table and policies.
4. Get your **Project URL** and **Anon Key** from **Project Settings -> API**.

### 3. Environment Variables

Create `.env.local` in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Locally
```bash
npm run dev
```
Visit http://localhost:3000

## Deployment to Vercel

1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Add the Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in Vercel Project Settings.
4. Deploy!

## Problems Solved

- **Realtime Sync**: Leveraged Supabase Realtime subscriptions in a client component (`BookmarkList`) to update UI instantly without refresh.
- **Auth Protection**: Used Next.js Middleware to protect routes and redirect unauthenticated users.
- **Type Safety**: Built with TypeScript for robustness.
