# API — Endpoints e Contratos

## Sumário

- [1. Visão geral](#1-visão-geral)
- [2. Convenções da API](#2-convenções-da-api)
- [3. Inventário por módulo](#3-inventário-por-módulo)
  - [3.1 User](#31-user)
  - [3.2 Atividade](#32-atividade)
  - [3.3 Tarefas](#33-tarefas)
  - [3.4 Feedback](#34-feedback)
  - [3.5 Media](#35-media)
  - [3.6 Grupos/Presença](#36-grupospresença)
  - [3.7 Análise mensal](#37-análise-mensal)
  - [3.8 Kanban](#38-kanban)
- [4. Endpoint → telas consumidoras (front)](#4-endpoint--telas-consumidoras-front)
- [Assumptions & Gaps](#assumptions--gaps)

## 1. Visão geral

- **Base URL (front)**: configurada por `VITE_API_URL` em `Front/src/lib/env.ts`.
- **Swagger UI**: `GET /docs` no back-end (`Back/src/app.ts`).
- **Auth**: a maioria dos endpoints exige JWT (guard `verifyJwt`).

## 2. Convenções da API

### 2.1 Autenticação

- Header esperado: `Authorization: Bearer <JWT>`
- Em rotas protegidas, falha de autenticação retorna:
  - **401** `{ "message": "Unauthorized." }` (ver `Back/src/lib/verify-jwt.ts`)

### 2.2 Content-types especiais

- `POST /tarefas/gerarPdf`: retorna `application/pdf` (buffer).
- Uploads:
  - `POST /user/file` (multipart) — retorna URL/metadata (ver `Back/src/controller/user/routes.ts`)
  - `POST /media/file` (multipart) — usado no front (ver `Front/src/components/UploadVideos.tsx`)

## 3. Inventário por módulo

> Os prefixos são registrados em `Back/src/app.ts`.

### 3.1 User

Rotas em `Back/src/controller/user/routes.ts` (prefixo `/user`).

| Método | Rota | Auth | Body (resumo) | Response (resumo) | Erros esperados |
|---|---|---|---|---|---|
| POST | `/user/auth` | Não | `{ matricula:number, passwordBody:string }` | **200** `token` (string) | 400 `{message}`; 500 |
| GET | `/user/profile` | Sim | — | **200** perfil do usuário | 401 `{message}` |
| POST | `/user/created` | Sim | `{ name, matricula, passwordBody, turno, role, avatarUrl? }` | **201** `{ user: {...} }` | 401; 400/409 (dependendo do use case) |
| PUT | `/user/update-password` | Sim | `{ senha: string }` | 200 (não padronizado) | 401; 400 |
| POST | `/user/file` | Sim | `multipart/form-data` | 200 (URL/metadata) | 401 |
| PUT | `/user/avataurl` | Sim | (não explicitado no schema) | 200 | 401 |
| GET | `/user/find` | Sim | — | lista usuários | 401 |
| GET | `/user/findid/:id` | Sim | — | usuário por id | 401; 404 |
| POST | `/user/updateuser` | Sim | `{ id, name?, password?, ativado? }` | 200 | 401; 400 |

**Exemplo (login)**:

```bash
curl -X POST "$API_URL/user/auth" \
  -H "Content-Type: application/json" \
  -d '{"matricula":123,"passwordBody":"senha"}'
```

Resposta (observada em controller): token como string.

### 3.2 Atividade

Rotas em `Back/src/controller/atividade/routes.ts` (prefixo `/atividade`).

| Método | Rota | Auth | Body (resumo) | Response (resumo) |
|---|---|---|---|---|
| POST | `/atividade/create` | Sim | `{ cod_atividade:number, setor:string, descricao:string, tempoMedio:number, ativado?:boolean }` | **201** `{ atividade: {...} }` |
| GET | `/atividade/list` | Sim | — | lista de atividades |

### 3.3 Tarefas

Rotas em `Back/src/controller/tarefas/routes.ts` (prefixo `/tarefas`).

| Método | Rota | Auth | Body/Params (resumo) | Response (resumo) |
|---|---|---|---|---|
| POST | `/tarefas/create` | Sim | `{ data, item, codAtividade, idDocumento, qtdFolha, hInicioController, hTerminoController, nAtendimento }` | **201** tarefa criada |
| POST | `/tarefas/listaTarefas` | Sim | `{ dataB?: string }` | lista de tarefas |
| POST | `/tarefas/listbyinterval` | Sim | `{ startDate, endDate }` | lista de tarefas |
| GET | `/tarefas/find/:id` | Sim | `params: { id }` | tarefa |
| PATCH | `/tarefas/update` | Sim | (campos opcionais + `id`) | tarefa atualizada |
| POST | `/tarefas/deletar` | Sim | `{ id, ativado }` | **204** `{ message }` (conforme schema) |
| POST | `/tarefas/search` | Sim | `{ type, value }` | lista |
| POST | `/tarefas/gerarPdf` | Sim | (payload varia; ver controller) | `application/pdf` |
| POST | `/tarefas/countdepartment` | Sim | `{ userId, setor }` | contagem |
| POST | `/tarefas/countcodigo` | Sim | `{ userId, codigo }` | contagem |
| GET | `/tarefas/count/:userId` | Sim | `params: { userId }` | `{ total }` (derivado do front) |
| GET | `/tarefas/averagetime/:userId` | Sim | `params: { userId }` | `{ average }` (derivado do front) |
| GET | `/tarefas/topactive/:userId` | Sim | `params: { userId }` | top 5 |
| GET | `/tarefas/totalmeses/:userId` | Sim | `params: { userId }` | série mensal |
| GET | `/tarefas/total` | Sim | — | total geral |

### 3.4 Feedback

Rotas em `Back/src/controller/feedback/routes.ts` (prefixo `/feedback`).

| Método | Rota | Auth | Body/Params (resumo) | Response (resumo) |
|---|---|---|---|---|
| POST | `/feedback/create` | Não | `{ conteudo, status?, nome? }` | **201** `{ message }` |
| GET | `/feedback/list` | Não | — | lista |
| GET | `/feedback/list/:id` | Sim | `params: { id }` | item |
| PATCH | `/feedback/updateStatus` | Sim | `{ id, status }` | `{ message }` |

### 3.5 Media

Rotas em `Back/src/controller/media/routes.ts` (prefixo `/media`).

| Método | Rota | Auth | Body/Params (resumo) | Response (resumo) |
|---|---|---|---|---|
| POST | `/media/create` | Sim | (metadados; ver controller `Back/src/controller/media/create.ts`) | 201/200 |
| POST | `/media/file` | Não (na rota atual) | `multipart/form-data` | URL/metadata |
| GET | `/media/list` | Sim | — | lista |
| GET | `/media/helo` | Não | — | health/demo |

### 3.6 Grupos/Presença

Rotas em `Back/src/controller/grupos/routes.ts` (prefixo `/grupos`).

| Método | Rota | Auth | Body/Params (resumo) |
|---|---|---|---|
| POST | `/grupos/create` | Sim | `{ nome, diasEmpresa?: number[], diasInstituicao?: number[], dataInicio:Date, dataFim?:Date }` |
| GET | `/grupos/find` | Sim | — |
| POST | `/grupos/vincular` | Sim | `{ userId, grupoId, dataInicio:Date, dataFim?:Date }` |
| POST | `/grupos/encerrarvinculo` | Sim | `{ userId, dataFim:Date }` |
| POST | `/grupos/trocarvinculo` | Sim | `{ userId, novoGrupoId, dataInicio:Date }` |
| GET | `/grupos/find/:id` | Sim | `params: { id }` (grupo do usuário) |
| DELETE | `/grupos/delete/:id` | Sim | `params: { id }` |
| POST | `/grupos/createpresenca` | Sim | `{ userId, data:Date, origem }` |
| POST | `/grupos/findfordate` | Sim | `{ date:Date }` |
| GET | `/grupos/presencauser` | Sim | — |
| POST | `/grupos/findbyperiod` | Sim | `{ userId, inicio:Date, fim:Date }` |
| POST | `/grupos/findbystatus` | Sim | `{ status, inicio:Date, fim:Date }` |
| POST | `/grupos/registrar` | Sim | `{ presencaId, horaEntrada:string }` |
| PATCH | `/grupos/updatestatus` | Sim | `{ presencaId, status }` |
| GET | `/grupos/updatependentes` | Sim | — |

### 3.7 Análise mensal

Rotas em `Back/src/controller/analiseMensal/route.ts` (prefixo `/analise`).

| Método | Rota | Auth | Body/Params (resumo) |
|---|---|---|---|
| POST | `/analise/create` | Sim | `{ userId, mes, ano }` |
| POST | `/analise/find` | Sim | `{ userId }` |
| POST | `/analise/findAnalises` | Sim | `{ mes, ano }` |
| GET | `/analise/count/:usuarioId` | Sim | `params: { usuarioId }` |
| POST | `/analise/pdf` | Sim | `{ userId, mes, ano }` |

### 3.8 Kanban

Rotas em `Back/src/controller/kanban/route.ts` (prefixo `/kanban`).

| Método | Rota | Auth | Body/Params (resumo) |
|---|---|---|---|
| POST | `/kanban/create` | Sim | `{ titulo, descricao, codAtividades }` |
| GET | `/kanban/findall` | Sim | — |
| GET | `/kanban/find/:id` | Sim | `params: { id }` |
| GET | `/kanban/findbystatus/:status` | Sim | `params: { status }` |
| PATCH | `/kanban/updatedetails` | Sim | `{ id, titulo?, descricao?, codAtividades? }` |
| PATCH | `/kanban/in_progress` | Sim | `{ id, userId }` |
| PATCH | `/kanban/finish` | Sim | `{ id, userId }` |
| PATCH | `/kanban/cancel` | Sim | `{ id, userId, motivo? }` |
| DELETE | `/kanban/delete` | Sim | `{ id }` |

## 4. Endpoint → telas consumidoras (front)

Mapeado a partir de usos em `Front/src/api/*` e chamadas diretas via `api.*`:

| Endpoint | Tela(s) / componente(s) consumidor(es) |
|---|---|
| `POST /user/auth` | `Front/src/pages/auth/sign-in.tsx`, `Front/src/context/authContext.tsx` |
| `GET /user/profile` | `Front/src/context/authContext.tsx`, `Front/src/api/profile.ts`, `Front/src/pages/app/Kanban.tsx` (React Query) |
| `POST /user/created` | `Front/src/components/criarUsuarioButton.tsx` |
| `PUT /user/update-password` | `Front/src/pages/app/Profille.tsx` |
| `POST /user/file` e `PUT /user/avataurl` | `Front/src/api/updataAvata.ts` |
| `GET /user/find` | `Front/src/api/findUser.ts`, `Front/src/pages/app/dashboard.tsx`, `Front/src/pages/app/ConsultarPresenca.tsx`, `Front/src/pages/app/AnaliseMensal.tsx` |
| `GET /user/findid/:id` | `Front/src/api/findUserId.ts`, `Front/src/components/findUserId.tsx` |
| `POST /tarefas/create` | `Front/src/components/criarAtividadeButton.tsx` |
| `POST /tarefas/listaTarefas` | `Front/src/components/dataPicker.tsx` |
| `POST /tarefas/listbyinterval` | `Front/src/components/dataPicker.tsx` |
| `POST /tarefas/gerarPdf` | `Front/src/components/dataPicker.tsx` |
| `PATCH /tarefas/update` | `Front/src/components/updateTarefas.tsx` |
| `POST /tarefas/deletar` | `Front/src/components/tabelaAtividades.tsx` |
| `POST /tarefas/search` | `Front/src/components/searchTarefas.tsx` |
| `GET /tarefas/count/:userId` | `Front/src/api/contagelTotal.ts`, `Front/src/pages/app/dashboard.tsx` |
| `GET /tarefas/averagetime/:userId` | `Front/src/api/averageTime.ts`, `Front/src/pages/app/dashboard.tsx` |
| `GET /tarefas/topactive/:userId` | `Front/src/api/topFiveAtividades.ts`, `Front/src/pages/app/dashboard.tsx` |
| `GET /tarefas/totalmeses/:userId` | `Front/src/api/totalMesAMes.ts`, `Front/src/pages/app/dashboard.tsx` |
| `GET /tarefas/total` | `Front/src/api/totalTarefas.ts`, `Front/src/pages/app/dashboard.tsx` |
| `POST /tarefas/countdepartment` | `Front/src/api/contaSetor.ts`, `Front/src/pages/app/dashboard.tsx` |
| `POST /tarefas/countcodigo` | `Front/src/api/contagemCodigo.ts`, `Front/src/pages/app/dashboard.tsx` |
| `GET /atividade/list` | `Front/src/pages/app/dashboard.tsx`, `Front/src/components/codAtividades.tsx` |
| `POST /feedback/create` | `Front/src/components/feedback.tsx` |
| `GET /feedback/list` | `Front/src/api/listFeedbacks.ts`, `Front/src/pages/app/FeedbackRelatorio.tsx` |
| `GET /feedback/list/:id` | `Front/src/components/detalhesFeedback.tsx` |
| `PATCH /feedback/updateStatus` | `Front/src/pages/app/FeedbackRelatorio.tsx` |
| `GET /grupos/find` | `Front/src/api/findGrupos.ts`, `Front/src/components/tabelaGrupos.tsx` |
| `POST /grupos/create` | `Front/src/api/criarGrupos.ts`, `Front/src/components/CriarGrupos.tsx` |
| `POST /grupos/vincular` | `Front/src/components/VincularUsuarioDialog.tsx` |
| `POST /grupos/encerrarvinculo` | `Front/src/components/UpdateUser.tsx` |
| `DELETE /grupos/delete/:id` | `Front/src/components/tabelaGrupos.tsx` |
| `POST /grupos/findfordate` + `POST /grupos/registrar` | `Front/src/api/registraEntrada.ts` (registro de entrada) |
| `POST /grupos/findbyperiod` | `Front/src/pages/app/ConsultarPresenca.tsx` |
| `POST /grupos/findbystatus` | `Front/src/pages/app/GerenciaPresenca.tsx` |
| `PATCH /grupos/updatestatus` | `Front/src/components/AtualizarStatusPresencaDialog.tsx` |
| `GET /grupos/updatependentes` | `Front/src/pages/app/ConsultarPresenca.tsx` |
| `POST /analise/create` | `Front/src/components/CriarSelo.tsx` |
| `POST /analise/find` | `Front/src/pages/app/AnaliseMensal.tsx` |
| `POST /analise/findAnalises` | `Front/src/pages/app/analisesMensais.tsx` |
| `GET /analise/count/:usuarioId` | `Front/src/pages/layout/appLayout.tsx` |
| `GET /kanban/findall` | `Front/src/pages/app/Kanban.tsx` |
| `POST /kanban/create` | `Front/src/components/CriarKanban.tsx` |
| `PATCH /kanban/updatedetails` | `Front/src/components/KanbanDetalhesDialog.tsx` |
| `PATCH /kanban/in_progress` | `Front/src/pages/app/Kanban.tsx`, `Front/src/components/AdicionarColaboradoresDialog.tsx` |
| `PATCH /kanban/finish` | `Front/src/pages/app/Kanban.tsx` |
| `PATCH /kanban/cancel` | `Front/src/components/CancelarKanbanDialog.tsx` |
| `POST /media/file` + `POST /media/create` | `Front/src/components/UploadVideos.tsx` |

## Assumptions & Gaps

- Onde o schema do endpoint não define `response`, o “Response (resumo)” foi descrito **pelo uso no front** e/ou leitura do controller. Para padronização, recomenda-se completar `schema.response` no backend.
- `POST /user/auth` retorna token como string no controller, mas o swagger do route indica `{ token: string }`. Esta doc registra o comportamento atual.
