# Setup e Execução (local)

## Sumário

- [1. Pré-requisitos](#1-pré-requisitos)
- [2. Variáveis de ambiente](#2-variáveis-de-ambiente)
  - [2.1 Back-end](#21-back-end)
  - [2.2 Front-end](#22-front-end)
- [3. Comandos (Back-end)](#3-comandos-back-end)
- [4. Comandos (Front-end)](#4-comandos-front-end)
- [5. Troubleshooting](#5-troubleshooting)
- [Assumptions & Gaps](#assumptions--gaps)

## 1. Pré-requisitos

- **Node.js** (recomendado: versão LTS atual)
- **Gerenciador de pacotes**: npm (ou equivalente)
- **PostgreSQL** (local ou via container)

Estrutura do repo:

- `Back/` (API Fastify)
- `Front/` (React/Vite)

## 2. Variáveis de ambiente

### 2.1 Back-end

O schema de env é validado em `Back/src/lib/env.ts`.

Arquivo de exemplo: `Back/.env.exemplo`.

Chaves esperadas:

| Chave | Obrigatória | Exemplo | Descrição |
|---|---:|---|---|
| `JWT_SECRET` | Sim | `...` | Segredo de assinatura do JWT (`@fastify/jwt`) |
| `DATABASE_URL` | Sim | `postgres://...` | String de conexão do Postgres |
| `ACCESS_TOKEN` | Sim | `token` | Chave usada no projeto (não observada em uso nos trechos lidos) |
| `PORT` | Não | `3333` | Porta do servidor (`default=3333`) |

### 2.2 Front-end

Env validado em `Front/src/lib/env.ts` (via Zod).

Chaves esperadas:

| Chave | Obrigatória | Exemplo | Descrição |
|---|---:|---|---|
| `VITE_API_URL` | Sim | `http://localhost:3333` | Base URL da API |
| `VITE_ENABLE_API_DELAY` | Sim | `false` | Habilita delay artificial em requests (interceptor) |

## 3. Comandos (Back-end)

Em `Back/package.json`:

| Comando | O que faz |
|---|---|
| `npm run dev` | Executa API com `tsx watch src/server.ts` |
| `npm start` | Executa `node ... src/server.ts` carregando `.env` |
| `npm run generate` | Gera migrações (Drizzle) |
| `npm run migrate` | Aplica migrações (Drizzle) |
| `npm run criapresenca` | Executa manualmente job de criar presenças |
| `npm run fechapresenca` | Executa manualmente job de fechar presenças pendentes |

Execução típica:

```bash
cd Back
npm install
cp .env.exemplo .env
npm run migrate
npm run dev
```

Swagger UI:

- Acesse `http://localhost:3333/docs` (se `PORT=3333`)

## 4. Comandos (Front-end)

Em `Front/package.json`:

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe Vite dev server |
| `npm run build` | Build de produção (`tsc -b` + `vite build`) |
| `npm run preview` | Preview do build |

Execução típica:

```bash
cd Front
npm install
# criar .env conforme chaves VITE_*
npm run dev
```

## 5. Troubleshooting

- **401 Unauthorized no front**:
  - Verifique se `VITE_API_URL` está correto e se o back está rodando.
  - Verifique se o token foi persistido e se o header `Authorization` está sendo setado (ver `Front/src/context/authContext.tsx`).
- **CORS**:
  - O back está configurado com `origin: '*'` e métodos principais em `Back/src/app.ts`.
- **Swagger vazio/incompleto**:
  - Alguns endpoints não definem `schema.response`; completar schemas melhora a documentação.
- **Jobs não executam**:
  - Jobs de presença dependem do processo do back estar vivo; em dev, garanta que a API esteja rodando nos horários agendados.
- **Migrações falham**:
  - Confirme `DATABASE_URL` e se o banco existe.

## Assumptions & Gaps

- Não foi encontrado `.env.example` do front no repositório; as chaves foram derivadas do parser em `Front/src/lib/env.ts`.
