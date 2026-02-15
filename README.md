# Smart Bookmark App

A production-ready bookmark manager built with Next.js 14, Supabase, and Tailwind CSS.
Features Google OAuth authentication, private per-user bookmarks, and real-time updates across devices.

## Features

- **Google OAuth Authentication**: Secure login via Supabase Auth.
- **Private Bookmarks**: Row Level Security (rls) ensures data privacy.
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

## Problems Faced & Solutions

### 1. Realtime Sync Across Devices
**Problem:** The app needed to reflect changes (additions, deletions) instantly across all open tabs and devices without a manual refresh. standard fetching only happens on mount or user action.
**Solution:** 
- Integrated **Supabase Realtime** subscriptions in the client-side `BookmarkList` component.
- Implemented a subscription listener that watches for `INSERT` and `DELETE` events on the `bookmarks` table.
- Used **Optimistic UI Updates** where possible, but relied on the realtime subscription payload to keep the local state in sync with the server, ensuring data consistency even with multiple users or tabs active.

### 2. Modern & Responsive UI Redesign
**Problem:** The initial UI was functional but plain, lacking visual appeal and modern aesthetics. It also needed to look good on both mobile and desktop.
**Solution:**
- Migrated to a **Glassmorphism** design language using **Tailwind CSS**, utilizing semi-transparent backgrounds requests, blurs, and subtle enhancements.
- Built a responsive **Masonry-like Grid** for bookmarks that adjusts columns (1 on mobile, 2 on tablet, 3 on desktop) using Tailwind's grid system (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
- Added a polished **Top Navigation Bar** with a blurred background for a premium feel.

### 3. Instant Search Functionality
**Problem:** Users needed a way to quickly find bookmarks. Querying the database for every keystroke would be slow and inefficient for the expected dataset size.
**Solution:**
- Implemented **Client-Side Filtering**. The app fetches all user bookmarks on load (reasonable for a bookmark manager).
- Created a search state that filters the visible `bookmarks` array in real-time as the user types.
- Added visual highlighting for matched terms and an empty state when no results are found, providing immediate feedback without network latency.

### 4. Secure Authentication & Data Privacy
**Problem:** Ensuring users only see their own bookmarks and not others', while maintaining a simple login flow.
**Solution:**
- Used **Supabase Auth** with Google OAuth for a frictionless login experience.
- Implemented **Row Level Security (RLS)** policies on the PostgreSQL database. Policies enforce that users can only `SELECT`, `INSERT`, and `DELETE` rows where `user_id` matches their authenticated UUID. This moves security from the application logic down to the database layer.
