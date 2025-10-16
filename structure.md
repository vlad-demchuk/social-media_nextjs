# Project Structure & Architecture

This document describes the folder and file structure of the project, outlining the purpose of each main directory and key files.

---

## Root
- **codegen.ts**       — GraphQL code generation config (for TypeScript types, fragments, etc).
- **eslint.config.mjs** — ESLint configuration.
- **next.config.ts**    — Next.js custom configuration (includes custom rewrites to API/GraphQL backends).
- **package.json / package-lock.json** — Project dependencies and scripts.
- **postcss.config.mjs** — PostCSS config (used by Tailwind CSS).
- **README.md**         — Project overview and developer instructions.
- **tsconfig.json**     — TypeScript configuration.
- **TODO.md**           — Developer TODOs.

## /public
Static assets served by Next.js. Contains SVGs and favicon. Add site-wide image assets here.

## /src
Main application source code. Major subfolders:

### /src/app
- The top-level routing directory (Next.js App Router).
- Contains route folders for `/auth`, `/feed`, `/messages`, `/users`.
- Each feature section has its own route layout and pages (incl. error/loading states) for better user experience.
- `layout.tsx`: Root layout, global providers.
- `page.tsx`: Home/landing page.

### /src/components
- Reusable, presentational UI components.
- `/ui`: Base UI building blocks (Button, Card, Avatar, etc).
- Navigation, header, and general layout parts (app-header, side-nav, etc).

### /src/features
Feature-centric folder for business logic and state related to key domain concepts:
  - **/posts**: Code (actions, UI, helpers) related to social posts.
  - **/comments**: Logic and components for post comments.
  - **/messages**: Messaging and conversation functionality.
  - **/users**: (Placeholder for user/profile-related code.)

Each feature can have its own `/components`, `/actions`, and, if needed, other submodules.

### /src/graphql
- **/generated**: GraphQL codegen outputs (fragments, full types).
- **/queries**: Individual GraphQL documents grouped by resource: comment, post, user, etc.

### /src/lib
- Shared libraries and configuration utilities for the app.
- **/auth**: Auth helpers (client/server config and instantiation).
- **/graphql**: Apollo client setup, wrappers.
- **config.ts**: Runtime environment variable validation and selection.
- **utils.ts**: General helper functions.

### /src/assets
- Raw asset files (e.g., hero images) for import via next/image.

### /src/styles
- Stylesheets (e.g., `globals.css` for Tailwind base + custom global styles).

### /src/types
- App-wide shared TypeScript types (like navigation definitions).

### /src/state
- (Potential) State management providers by domain (empty/placeholder in tree).

### /src/services
- (Potential) Adapters for external APIs/services.

---

## Notes
- **Modularization**: Each domain feature (posts, comments, etc) is encouraged to encapsulate its own UI, actions, and business logic.
- **Colocation**: Components are colocated as much as possible with their usage context to aid maintainability.
- **Strict Typing**: GraphQL codegen is used for API safety; Zod is used for runtime validation of form data and env vars.
