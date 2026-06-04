# Production Dockerfile for the Next.js 16 site, used by Dokploy.
# Multi-stage build: deps → builder → runner. Only runner ships.

# ──────────────────────────────────────────────
# STAGE 1: deps — install dependencies
# ──────────────────────────────────────────────
FROM node:22-slim AS deps
WORKDIR /app

# Copy lockfiles only, so Docker caches this layer when only code changes.
COPY package*.json ./
RUN npm ci

# ──────────────────────────────────────────────
# STAGE 2: builder — build the production bundle
# ──────────────────────────────────────────────
FROM node:22-slim AS builder
WORKDIR /app

# Pull node_modules from the deps stage (no reinstall needed).
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js anonymous telemetry in builds.
ENV NEXT_TELEMETRY_DISABLED=1

# Produces .next/standalone (needs `output: 'standalone'` in next.config).
RUN npm run build

# ──────────────────────────────────────────────
# STAGE 3: runner — the small, secure final image
# ──────────────────────────────────────────────
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user to run the app (security hardening).
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy ONLY what's needed from the builder, owned by the non-root user.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# The standalone bundle ships its own server.js — no `npm start` needed.
CMD ["node", "server.js"]
