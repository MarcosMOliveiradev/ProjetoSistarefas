# Operação e Manutenção

## Sumário

- [1. Deploy (situação atual e recomendação)](#1-deploy-situação-atual-e-recomendação)
- [2. Observabilidade mínima](#2-observabilidade-mínima)
- [3. Segurança](#3-segurança)
- [4. Uploads e arquivos estáticos](#4-uploads-e-arquivos-estáticos)
- [5. Banco de dados e migrações](#5-banco-de-dados-e-migrações)
- [6. Jobs agendados (presença)](#6-jobs-agendados-presença)
- [7. Boas práticas para evoluir sem quebrar contratos](#7-boas-práticas-para-evoluir-sem-quebrar-contratos)
- [Assumptions & Gaps](#assumptions--gaps)

## 1. Deploy (situação atual e recomendação)

### 1.1 Situação atual (observada)

O repositório não contém scripts/documentos de deploy. A execução do back é via Node (`Back/src/server.ts`) e o front é um build Vite.

### 1.2 Fluxo recomendado (mínimo)

- **Back-end**
  - Build/execução: rodar `npm install` e `npm start` (ou `node` com `tsx`/transpile conforme estratégia do time)
  - Migrações: `npm run migrate` como etapa antes do start (uma vez por release)
  - Healthcheck sugerido: endpoint dedicado `/health` (não existe hoje)
- **Front-end**
  - Build: `npm run build`
  - Servir estáticos: Nginx/Apache/serviço estático (ou Vite preview apenas para testes)
- **Infra**
  - Variáveis de ambiente seguras via secret manager
  - Banco Postgres gerenciado

## 2. Observabilidade mínima

### 2.1 Logs

Atualmente, logs são feitos via `console.log`:

- Inicialização do servidor: `Back/src/server.ts`
- Execução de jobs: `Back/src/application/useCase/grupos/function/*.ts`

Recomendação:

- Padronizar logger (p. ex. pino, nativo do Fastify) com:
  - request id, rota, status code, latência
  - logs estruturados (JSON) para ingestão em observabilidade

### 2.2 Erros

No front, `Front/src/lib/axios.ts` converte erros em `AppErrors` e dispara `signOut()` em alguns cenários 401/404.

Recomendação:

- Back-end: padronizar erros (ver `docs/01-arquitetura-backend.md` seção de erros) e retornar status coerentes.
- Front-end: evitar dependência de mensagens literais (`Unauthorized.`/`invalid`) para lógica.

## 3. Segurança

### 3.1 JWT

- Emissão e verificação via `@fastify/jwt`.
- `verifyJwt` bloqueia rotas protegidas e retorna 401.

Recomendações:

- Centralizar **autorização** por `role` no back-end (hoje muito está no client).
- Rotacionar `JWT_SECRET` e manter em segredo.

### 3.2 CORS

Configurado como `origin: '*'` em `Back/src/app.ts`.

Recomendação:

- Em produção, restringir origens para o(s) domínio(s) do front.

### 3.3 Cookies

No login, o token também é setado em cookie `refreshToken` (`httpOnly`, `sameSite=lax`, `secure=false`).

Recomendação:

- Se o cookie for usado em produção, habilitar `secure=true` em HTTPS e revisar estratégia real de refresh token (não observada como implementada).

## 4. Uploads e arquivos estáticos

O back serve a pasta `uploads/` em `/uploads/` (`@fastify/static` em `Back/src/app.ts`).

Riscos e recomendações:

- Validar tipo/tamanho de arquivo no upload.
- Isolar storage (S3/Blob) em produção ou proteger diretório local.
- Definir política de limpeza/expiração se aplicável.

## 5. Banco de dados e migrações

- ORM: Drizzle (schema em `Back/src/database/drizzle`).
- Migrações: `Back/drizzle/*` via `drizzle-kit`.

Boas práticas:

- Sempre aplicar migrações antes de subir uma nova versão do back.
- Garantir backups e plano de rollback.

## 6. Jobs agendados (presença)

Jobs configurados com `node-cron` (timezone `America/Sao_Paulo`):

- 06:30: criação de presenças do dia
- 17:20: fechamento de presenças pendentes

Operação:

- Estes jobs dependem do processo do back estar vivo. Em ambientes com múltiplas réplicas, há risco de execução duplicada.

Recomendação:

- Se houver escala horizontal, mover para um job runner único (queue/cron central) ou aplicar lock no banco.

## 7. Boas práticas para evoluir sem quebrar contratos

- **Contratos de API**
  - Manter Swagger consistente com payload real.
  - Versionar endpoints se houver breaking changes.
- **Padronização**
  - Padronizar respostas e erros em JSON.
  - Consolidar autorização por role no servidor.
- **Testes**
  - Cobrir use cases críticos (auth, tarefas, presença, kanban).
- **Migrações**
  - Evitar alterações destrutivas sem etapa de compatibilidade.

## Assumptions & Gaps

- Não há documentação/infra de deploy no repo; esta seção descreve um fluxo recomendado e mínimo.
