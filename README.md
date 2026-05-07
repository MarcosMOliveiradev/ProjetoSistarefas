## SisTarefas

Sistema full-stack para **gestão de tarefas/atividades** do **Programa de Jovem Aprendiz (PJA)**, com foco em:

- **Registro diário de tarefas** (com filtros por período e exportação em PDF)
- **Visão gerencial** com métricas (totais, top 5, média de tempo, série mensal)
- **Gestão de grupos e presenças** (com automação por jobs)
- **Análises mensais (“selos”)** com consultas por usuário e por período
- **Kanban** para organizar atividades em fluxo (TODO → IN_PROGRESS → DONE, com cancelamento)
- **Feedback** (entrada pública + tratamento/triagem)
- **Mídia/Vídeos** (upload e listagem por categoria/setor)

## Problema que resolve e público-alvo

- **Público-alvo**: jovens aprendizes (PJA) e equipe de gestão/TI (papel `INFORMATICA`).
- **Problema**: centralizar o registro e acompanhamento de tarefas e presenças, garantindo rastreabilidade e visibilidade gerencial do desempenho/participação.

## Principais módulos entregues (derivado do código)

- **Tarefas**: criação, listagem, busca, atualização, “exclusão” (soft), métricas e PDF
- **Atividades (códigos)**: cadastro e listagem de códigos/setores/descrições
- **Feedback**: criação e atualização de status
- **Grupos/Presença**: criação de grupos, vínculo usuário↔grupo, consulta/gestão de presenças, registro de entrada e jobs
- **Análise Mensal**: criação e consultas (por usuário e por período) + PDF (backend)
- **Kanban**: criar, listar, iniciar, concluir, cancelar e deletar
- **Mídia/Vídeos**: upload de arquivo/URL e listagem por categoria

## Arquitetura em alto nível

```mermaid
flowchart LR
  subgraph Front[Front-end (React/Vite)]
    UI[SPA]
  end

  subgraph Back[Back-end (Fastify)]
    API[REST API + Swagger /docs]
    Jobs[Jobs node-cron (presença)]
  end

  subgraph DB[(PostgreSQL)]
    PG[(Schema Drizzle)]
  end

  UI -->|HTTP + Bearer JWT| API
  API --> PG
  Jobs --> PG
```

## Stack resumida

- **Back-end**: Node.js + TypeScript + Fastify + JWT + Zod + Swagger + Drizzle + PostgreSQL + node-cron + pdfmake
- **Front-end**: React + Vite + React Router + TanStack React Query + React Hook Form + Zod + TailwindCSS + Radix UI

## Quickstart local

### Pré-requisitos

- Node.js
- PostgreSQL

### 1) Back-end

Env de exemplo: `Back/.env.exemplo`  
Schema/validação de env: `Back/src/lib/env.ts`

```bash
cd Back
npm install
cp .env.exemplo .env
npm run migrate
npm run dev
```

Swagger UI: `http://localhost:3333/docs` (porta padrão: 3333)

### 2) Front-end

Chaves esperadas (validadas em `Front/src/lib/env.ts`):

- `VITE_API_URL`
- `VITE_ENABLE_API_DELAY`

```bash
cd Front
npm install
# crie um .env com:
# VITE_API_URL=http://localhost:3333
# VITE_ENABLE_API_DELAY=false
npm run dev
```

## Documentação detalhada

Índice: [`docs/00-indice.md`](./docs/00-indice.md)

- Visão geral: [`docs/00-visao-geral.md`](./docs/00-visao-geral.md)
- Back-end: [`docs/01-arquitetura-backend.md`](./docs/01-arquitetura-backend.md)
- Front-end: [`docs/02-arquitetura-frontend.md`](./docs/02-arquitetura-frontend.md)
- API: [`docs/03-api-endpoints.md`](./docs/03-api-endpoints.md)
- Dados: [`docs/04-modelo-de-dados.md`](./docs/04-modelo-de-dados.md)
- Fluxos: [`docs/05-fluxos-de-negocio.md`](./docs/05-fluxos-de-negocio.md)
- Setup: [`docs/06-setup-e-execucao.md`](./docs/06-setup-e-execucao.md)
- Operação: [`docs/07-operacao-e-manutencao.md`](./docs/07-operacao-e-manutencao.md)
- Roadmap: [`docs/08-roadmap-tecnico.md`](./docs/08-roadmap-tecnico.md)

## Status atual do projeto e próximos passos

Status (observado no código):

- **MVP funcional** com módulos centrais (tarefas, presença, análises, kanban, feedback e mídia).
- **Swagger disponível** em `/docs`.

Próximos passos técnicos recomendados:

- Padronizar contratos (Swagger vs payload real), erros e status codes.
- Implementar autorização server-side por `role` em rotas críticas.
- Robustez dos jobs (evitar execução duplicada em múltiplas instâncias).
- Testes mínimos de use cases (auth, tarefas, presença e kanban).