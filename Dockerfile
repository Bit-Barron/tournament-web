# Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
RUN pnpm install


FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ARG SECRET
ARG DATABASE_URL
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_PRICE_POOL
ENV SECRET=$SECRET
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_PRICE_POOL=$NEXT_PUBLIC_PRICE_POOL
RUN pnpm run build

FROM node:20-alpine AS prod
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm install -g pnpm
CMD ["pnpm", "run", "start"]
