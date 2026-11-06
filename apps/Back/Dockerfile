# syntax=docker/dockerfile:1.7

# ==========================================
# STAGE 1: BASE
# ==========================================

FROM node:26-slim AS base

WORKDIR /app

# Utiliza a mesma versão do pnpm definida no monorepo
RUN npm install --global pnpm@10.34.9


# ==========================================
# STAGE 2: PRUNER
# ==========================================

FROM base AS pruner

# Copia o monorepo para o ambiente de build
COPY . .

# Isola o backend e suas dependências
RUN pnpm dlx turbo@2.10.8 prune @sistearefas/back --docker


# ==========================================
# STAGE 3: BUILD
# ==========================================

FROM base AS build

# Primeiro copiamos os manifestos e o lockfile
# para aproveitar o cache de dependências do Docker
COPY --from=pruner /app/out/json/ ./
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Instala as dependências
RUN pnpm install --frozen-lockfile

# Agora copiamos o código-fonte
COPY --from=pruner /app/out/full/ ./

# Compila o backend e suas dependências internas
RUN pnpm exec turbo run build --filter=@sistearefas/back...

# Prepara uma instalação isolada com dependências
# de produção, sem ferramentas de desenvolvimento
RUN pnpm --filter=@sistearefas/back --prod deploy --legacy /app/deploy


# ==========================================
# STAGE 4: RUNNER
# ==========================================

FROM node:26-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copia somente os arquivos necessários para executar
COPY --from=build --chown=node:node /app/deploy/package.json ./package.json
COPY --from=build --chown=node:node /app/deploy/node_modules ./node_modules
COPY --from=build --chown=node:node /app/deploy/dist ./dist

# Executa como usuário não privilegiado
USER node

EXPOSE 3333

# Verifica se o processo da API está respondendo
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:' + (process.env.PORT || 3333) + '/health/live').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]

CMD ["node", "dist/server.js"]