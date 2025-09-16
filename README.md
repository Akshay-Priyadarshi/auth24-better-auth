# Auth24 - BetterAuth Provider

Auth24 is an authentication provider built with [Fastify](https://www.fastify.io/), [BetterAuth](https://www.npmjs.com/package/better-auth), and [Drizzle ORM](https://orm.drizzle.team/) for PostgreSQL. It provides a robust, modern authentication backend suitable for microservices and web applications.

## Project Overview

- **Framework:** Fastify
- **Authentication:** BetterAuth
- **ORM:** Drizzle ORM
- **Database:** PostgreSQL
- **Migration Tool:** Drizzle Kit
- **Containerization:** Docker & Docker Compose

## Important Packages

- `fastify`: Fast and low overhead web framework for Node.js.
- `better-auth`: Flexible authentication library.
- `drizzle-orm`: Type-safe ORM for SQL databases.
- `drizzle-kit`: Migration and schema generation for Drizzle ORM.
- `pg`: PostgreSQL client for Node.js.
- `@fastify/cors`: CORS support for Fastify.
- `dotenv`: Loads environment variables from `.env`.
- `nodemon`: Development tool for auto-restarting server.
- `@swc/core`, `@swc/cli`: Super-fast TypeScript/JavaScript compiler.
- `typescript`: TypeScript support.

## Getting Started

### Prerequisites

- Node.js (v22+ recommended)
- pnpm (v10+)
- Docker & Docker Compose (for containerized setup)
- PostgreSQL

### Local Development

1. **Install dependencies:**
   ```sh
   pnpm install
   ```

2. **Build the project:**
   ```sh
   pnpm build
   ```

3. **Run migrations:**
   ```sh
   pnpm migrations:apply
   ```

4. **Start the server:**
   ```sh
   pnpm start
   ```
   Or for development with auto-reload:
   ```sh
   pnpm dev
   ```

### Scripts

- `pnpm build`: Compile TypeScript using SWC.
- `pnpm dev`: Start server with Nodemon for development.
- `pnpm migrations:generate`: Generate new migration files.
- `pnpm migrations:apply`: Apply migrations to the database.
- `pnpm auth:generate`: Generate BetterAuth schema.

### Dockerized Setup

1. **Build and run with Docker Compose:**
   ```sh
   docker-compose up --build
   ```

2. **Services:**
   - `auth24`: Main authentication API (exposed on port 8000).
   - `auth24-migrate`: Runs migrations before starting the API.

### Environment Variables

Set the following variables in your environment or Docker Compose:

- `DATABASE_URL`: PostgreSQL connection string.
- `BETTER_AUTH_SECRET`: Secret for BetterAuth.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: For Google OAuth (if used).
- `APP_CLIENT_ORIGINS`: Allowed client origins.

## Folder Structure

```
src/
  server.ts           # Fastify server entrypoint
  db/
    postgres.ts       # DB connection
    migrations/       # SQL migrations
    schemas/          # Auth schemas
  lib/
    auth.ts           # BetterAuth config
```

## License

ISC

---

**Maintainer:** [Akshay Priyadarshi](https://github.com/Akshay-Priyadarshi)