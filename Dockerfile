# ---------- Base Image ----------
FROM node:22.19.0-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

# ---------- Dependencies ----------
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---------- Build ----------
FROM deps AS build
WORKDIR /app
COPY . .
RUN pnpm build

# ---------- Production Runtime ----------
FROM base AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV ADDRESS=0.0.0.0 
ENV PORT=8000

# Copy only necessary artifacts
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/db ./src/db
COPY --from=build /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=build /app/package.json ./package.json

EXPOSE 8000

CMD ["node", "dist/src/server.js"]
