# SocialFlow

A full-stack social media application built with Next.js and GraphQL. Create posts, comment, like, message other users, and receive real-time notifications.

## Tech Stack

**Frontend (this repo)**

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Apollo Client 4](https://www.apollographql.com/docs/react/) — GraphQL queries, mutations & WebSocket subscriptions
- [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix primitives)
- [Better Auth](https://www.better-auth.com/) — email/password authentication
- [Zod 4](https://zod.dev/) — runtime validation

**Backend (separate repo)**

- GraphQL API with real-time subscriptions over WebSocket
- Hosted at `social-media-server-grapqhl.onrender.com`

## Features

- **Authentication** — sign up / sign in with email & password
- **Posts** — create, view, and delete posts; per-post detail pages
- **Comments** — threaded comments on posts
- **Likes** — like / unlike posts
- **Messaging** — real-time direct messages via WebSocket
- **Notifications** — live notification feed with unread badge
- **User Profiles** — public profile pages at `/users/:name`
- **Dark Mode** — system-aware theme switching

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & layouts
│   ├── auth/               # Sign in / sign up
│   ├── feed/               # Post feed & post detail ([id])
│   ├── messages/           # Direct messaging
│   ├── notifications/      # Notification feed
│   └── users/[name]/       # User profiles
├── features/               # Domain modules
│   ├── auth/               # Auth components & hooks
│   ├── posts/              # Post components, actions, hooks
│   ├── comments/           # Comment components & actions
│   ├── messages/           # Messaging components & hooks
│   ├── notifications/      # Notification components & hooks
│   └── users/              # User components & hooks
├── components/ui/          # shadcn/ui primitives
├── graphql/
│   ├── queries/            # .graphql documents
│   └── generated/          # Auto-generated types & hooks
└── lib/
    ├── auth/               # Auth client & server helpers
    ├── graphql/             # Apollo Client setup & provider
    └── config.ts           # Environment config with Zod validation
```

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 10

### Installation

```bash
git clone https://github.com/<your-username>/social-media_nextjs.git
cd social-media_nextjs
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-backend.com/api/auth
NEXT_PUBLIC_GRAPHQL_URL=https://your-backend.com/graphql
NEXT_PUBLIC_GRAPHQL_WS_URL=wss://your-backend.com/graphql
NODE_ENV=development
```

In development, requests are proxied through Next.js rewrites to the backend, so the app works against `localhost:3000`.

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Production build (Turbopack) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests (Jest) |
| `npm run generate` | GraphQL codegen (requires backend at localhost:4000) |

## License

This project is for learning and portfolio purposes.