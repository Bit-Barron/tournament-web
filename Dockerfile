# Stage 1: Install dependencies (Debian statt Alpine)
FROM node:20-bookworm-slim AS deps
WORKDIR /app

# System libs (u.a. OpenSSL) für Prisma
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# pnpm bereitstellen (alternativ: corepack enable)
RUN npm install -g pnpm

# Nur Manifeste kopieren für bestes Caching
COPY package.json pnpm-lock.yaml ./
# Prisma-Schema, falls Postinstall-Scripts darauf zugreifen
COPY prisma ./prisma

# Postinstall-Scripts (z.B. prisma generate) beim Install überspringen
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=1

# Reproduzierbar installieren
RUN pnpm install --frozen-lockfile --ignore-scripts

# Stage 2: Build application
FROM node:20-bookworm-slim AS builder
WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

# Quellcode kopieren und node_modules übernehmen
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Build-Umgebungsvariablen (falls benötigt)
ARG SECRET
ARG DATABASE_URL
ARG NEXT_PUBLIC_URL
ENV SECRET=$SECRET
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL

# Jetzt Prisma Client generieren (Binary passt zu Debian)
RUN pnpm prisma generate --schema=prisma/schema.prisma

# App bauen
RUN pnpm run build

# Stage 3: Production image
FROM node:20-bookworm-slim AS prod
WORKDIR /app
ENV NODE_ENV=production

# nur notwendige Artefakte
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/node_modules ./node_modules

# optional: wenn du in prod lieber nur Runtime-Deps willst,
# dann statt des Kopierens von node_modules:
# COPY package.json pnpm-lock.yaml ./
# RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

EXPOSE 3000

# pnpm in Prod bereitstellen (falls du nicht oben Runtime-Install nutzt)
RUN npm install -g pnpm

CMD ["pnpm", "run", "start"]
