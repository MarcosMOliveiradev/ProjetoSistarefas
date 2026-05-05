# Roadmap Técnico

## Sumário

- [1. Visão geral](#1-visão-geral)
- [2. Débitos técnicos identificados (derivados do código)](#2-débitos-técnicos-identificados-derivados-do-código)
- [3. Priorização (curto vs médio prazo)](#3-priorização-curto-vs-médio-prazo)
- [4. Critérios de aceite por item](#4-critérios-de-aceite-por-item)
- [Assumptions & Gaps](#assumptions--gaps)

## 1. Visão geral

Este roadmap foca em melhorias técnicas que aumentam previsibilidade, segurança e manutenibilidade do SisTarefas, **sem assumir funcionalidades além do que existe hoje**.

## 2. Débitos técnicos identificados (derivados do código)

### 2.1 Contratos inconsistentes (Swagger vs payload real)

Evidências:

- `POST /user/auth` tem `schema.response` sugerindo `{ token: string }`, mas o controller envia o **token como string** (`Back/src/controller/user/authenticate.ts`).

Impacto:

- Dificulta integração e debugging; Swagger pode enganar consumidores.

### 2.2 Padrão de erros e status code não uniforme

Evidências:

- `verifyJwt` padroniza 401 `{message}`, mas controllers variam entre:
  - string direta,
  - `{ message }`,
  - status 501 para erro genérico (`Back/src/controller/tarefas/createTarefasController.ts`).

Impacto:

- Front precisa tratar casos especiais e mensagens literais.

### 2.3 Autorização por role majoritariamente no front

Evidências:

- Front bloqueia ações por `role` em alguns pontos (ex.: update status de feedback).
- Back-end, em geral, exige apenas JWT (`verifyJwt`) sem checar role em rotas sensíveis.

Impacto:

- Risco de escalonamento de privilégios via chamadas diretas à API.

### 2.4 Jobs de presença sem coordenação em ambiente escalável

Evidências:

- `node-cron` roda no processo do back (imports em `Back/src/app.ts`).

Impacto:

- Em multi-réplicas: execução duplicada; em downtime: job pode não rodar.

### 2.5 Data/hora armazenadas como tipos menos adequados

Evidências:

- `tarefas.data` é `text` (não `date`).
- Horários em tarefas são `integer` e validados por regra de negócio.

Impacto:

- Consultas por data e agregações podem ficar mais complexas (índices, ordenação, timezone).

### 2.6 Organização de consumo de API no front é híbrida

Evidências:

- Algumas rotas são consumidas por `Front/src/api/*`.
- Outras são chamadas direto em páginas (ex.: `Dashboard` faz `api.get("/atividade/list")`).

Impacto:

- Duplicação de lógica (headers, tipagem, erros), menor rastreabilidade.

## 3. Priorização (curto vs médio prazo)

### Curto prazo (1–2 sprints)

- Padronizar contratos de auth e respostas de erro.
- Centralizar autorização por role em endpoints críticos.
- Completar `schema.response` nas rotas mais usadas (melhora Swagger).
- Revisar segurança de CORS e cookie `secure`.

### Médio prazo (3–6 sprints)

- Criar endpoint de healthcheck e estruturar logs (logger do Fastify).
- Estratégia robusta de jobs (lock no banco ou runner dedicado).
- Revisar tipos de data/hora e índices.
- Unificar camada de API no front (um client por domínio).
- Adicionar suíte mínima de testes (use cases críticos).

## 4. Critérios de aceite por item

### Item: Padronização de erro/resposta

- Todas as rotas retornam erros no formato `{ message, code?, details? }`.
- Status codes seguem semântica (400/401/403/404/409/500).
- Front não depende de mensagens literais para decisões (ex.: signOut por status code).

### Item: Swagger alinhado ao comportamento real

- `GET /docs` reflete corretamente bodies, params e responses.
- Pelo menos os endpoints do fluxo principal (login, tarefas, presença, kanban) possuem `schema.response`.

### Item: Autorização server-side por role

- Rotas administrativas validam `role` via claim no JWT (ou consulta no banco).
- Há testes cobrindo pelo menos um caso proibido por role.

### Item: Robustez dos jobs

- Execução não duplica em ambiente com múltiplas instâncias.
- Existe mecanismo de backfill (rodar para datas passadas) ou validação idempotente no banco.

### Item: Unificação de consumo de API no front

- Chamadas diretas são migradas para `Front/src/api/*` (ou client por módulo).
- Tipos/DTOs e tratamento de erros são reutilizáveis.

## Assumptions & Gaps

- As prioridades assumem foco em estabilização/segurança; podem ser ajustadas conforme criticidade do ambiente (produção vs uso interno).
