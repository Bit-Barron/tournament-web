# ---- deps ----
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache openssl  # für pnpm hooks/engines, schadet nicht
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
# vollständige Installation (dev + prod), damit wir bauen/generate können
RUN pnpm install --frozen-lockfile

# ---- builder ----
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
COPY --from=deps /app/node_modules ./node_modules
# Prisma-Client für Alpine generieren (zieht die linux-musl Engines)
RUN pnpm prisma generate
# Next bauen
RUN pnpm build
# Für schlankes Prod-Image: nur prod-deps behalten
RUN pnpm prune --prod

# ---- prod ----
FROM node:20-alpine AS prod
WORKDIR /app
# Laufzeit-Abhängigkeiten
RUN apk add --no-cache openssl libc6-compat
# App-Dateien
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
# Nur Produktions-Node-Modules übernehmen (schlank)
COPY --from=builder /app/node_modules ./node_modules
RUN npm install -g pnpm
# Start: dein package.json "start" macht `prisma migrate deploy && next start`
EXPOSE 3000
CMD ["pnpm", "run", "start"]
