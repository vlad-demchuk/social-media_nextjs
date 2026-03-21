# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` (uses Turbopack)
- **Build**: `npm run build`
- **Lint**: `npm run lint` (ESLint)
- **GraphQL codegen**: `npm run generate` (requires backend running at localhost:4000)

## Architecture

Next.js 15 App Router frontend that connects to a separate GraphQL backend server. No database or ORM in this repo — all data flows through GraphQL.

### Backend Communication

- GraphQL queries/mutations via Apollo Client (HTTP)
- Real-time subscriptions via WebSocket (`ws://localhost:4000/graphql`)
- Auth requests proxied through Next.js rewrites (`/api/auth/*` → backend)
- GraphQL requests also proxied (`/graphql/*` → backend)
- Config in `src/lib/config.ts` switches between dev (localhost proxy) and prod URLs

### Data Flow

- **Server-side**: Apollo `query()` from `src/lib/graphql/apolloClient.ts` for initial data fetching in server components
- **Client-side**: Apollo Provider via `src/lib/graphql/ApolloWrapper.tsx` with HTTP/WS link splitting
- **Mutations**: Server Actions (e.g., `createPost`, `deletePost`) that call Apollo and `revalidatePath()`
- **Auth state**: Better Auth client (`src/lib/auth/auth-client.ts`) with `useSession()` hook

### Feature Organization

Features are colocated in `src/features/{posts,comments,messages,notifications,users,auth}/` — each contains components, actions, and hooks for that domain. GraphQL documents live in `src/graphql/queries/` and types are auto-generated in `src/graphql/generated/`.

### UI Layer

- shadcn/ui components in `src/components/ui/` (new-york style, Radix-based)
- Tailwind CSS v4 with CSS variables
- Path alias: `@/*` → `src/*`

### Auth

Better Auth v1.3.8 with email/password. Server-side session via `getServerSession()` from `src/lib/auth/auth-server.ts`. Usernames must be 3-30 chars, URL-safe.

### Environment Variables

Required in `.env`: `NEXT_PUBLIC_BETTER_AUTH_URL`, `NEXT_PUBLIC_GRAPHQL_URL`, `NEXT_PUBLIC_GRAPHQL_WS_URL`, `NODE_ENV`. Validated at runtime by Zod schema in `src/lib/config.ts`.
