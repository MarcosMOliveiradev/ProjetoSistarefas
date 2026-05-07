# Modelo de Dados (PostgreSQL + Drizzle)

## Sumário

- [1. Visão geral](#1-visão-geral)
- [2. Entidades e relacionamentos](#2-entidades-e-relacionamentos)
- [3. Dicionário de dados (entidades principais)](#3-dicionário-de-dados-entidades-principais)
- [4. Regras de negócio relevantes no nível de dados](#4-regras-de-negócio-relevantes-no-nível-de-dados)
- [5. Migrações e evolução de schema](#5-migrações-e-evolução-de-schema)
- [Assumptions & Gaps](#assumptions--gaps)

## 1. Visão geral

O SisTarefas usa **PostgreSQL** com schema definido em **Drizzle ORM**.

Fonte de verdade (schema manual):

- `Back/src/database/drizzle/*.ts` (tabelas + enums)

Artefatos gerados pelo `drizzle-kit`:

- `Back/drizzle/*.sql` e `Back/drizzle/meta/*.json`
- `Back/drizzle/schema.ts` e `Back/drizzle/relations.ts` (gerados)

> Para operação local, a conexão vem de `DATABASE_URL` em `Back/src/lib/env.ts` e exemplo em `Back/.env.exemplo`.

## 2. Entidades e relacionamentos

### 2.1 Diagrama lógico (Mermaid)

```mermaid
erDiagram
  USER ||--o{ TAREFAS : "registra"
  ATIVIDADE ||--o{ TAREFAS : "classifica"
  USER ||--o{ ATIVIDADE : "cadastra"

  USER ||--o{ USER_ROLES : "possui"
  USER ||--o{ MEDIA : "cria"
  MEDIA ||--o{ MEDIA_ROLES : "visibilidade"

  USER ||--o{ USER_GRUPOS : "participa"
  GRUPOS ||--o{ USER_GRUPOS : "vincula"
  USER ||--o{ PRESENCA : "marca"

  USER ||--o{ ANALISES_MENSAIS : "consolidado"

  USER ||--o{ KANBAN : "cria/inicia/finaliza/cancela"
  ATIVIDADE ||--o{ KANBAN : "referencia"
  KANBAN ||--o{ KANBAN_COLABORADORES : "colabora"
  USER ||--o{ KANBAN_COLABORADORES : "colabora"

  USER {
    text id PK
    text name
    int matricula UNIQUE
    text password
    text avatar_url
    enum turno
    bool ativado
    timestamp created_at
    timestamp updated_at
  }

  USER_ROLES {
    text user_id FK
    enum role
    PK user_id, role
  }

  ATIVIDADE {
    int cod_atividade PK
    text setor
    text descricao
    float tempo_medio
    bool ativado
    text usuario FK
  }

  TAREFAS {
    text id PK
    text data
    int item
    int cod_atividade FK
    int qtd_folha
    text id_documento
    int h_inicio
    int h_termino
    int n_atendimento
    bool ativado
    text usuario FK
    timestamp created_at
    timestamp updated_at
  }

  FEEDBACK {
    text id PK
    text conteudo
    enum status
    text nome
    timestamp created_at
    timestamp updated_at
  }

  MEDIA {
    text id PK
    text titulo
    text description
    text customer_id FK
    enum category
    text url
    timestamp created_at
    timestamp updated_at
  }

  MEDIA_ROLES {
    text media_id FK
    enum role
    PK media_id, role
  }

  GRUPOS {
    text id PK
    text nome
    int[] dias_empresa
    int[] dias_instituicao
    date data_inicio
    date data_fim
  }

  USER_GRUPOS {
    text id PK
    text user_id FK
    text grupo_id FK
    date data_inicio
    date data_fim
  }

  PRESENCA {
    text id PK
    text user_id FK
    date data
    enum tipo_esperado
    enum status
    time hora_entrada
    enum origem
  }

  ANALISES_MENSAIS {
    text id PK
    text usuario_id FK
    int mes
    int ano
    int dias_esperados_empresa
    int dias_esperados_instituicao
    int dias_cumpridos_empresa
    int dias_cumpridos_instituicao
    int atrasos
    numeric percentual_empresa
    numeric percentual_intituicao
    enum selo
    timestamp gerado_em
  }

  KANBAN {
    text id PK
    text titulo
    int cod_atividade FK
    text descricao
    enum status
    text criado_por FK
    date criado_em
    text iniciado_por FK
    date iniciado_em
    text finalizado_por FK
    date finalizado_em
    text cancelado_por FK
    date cancelado_em
    text motivo_cancelamento
  }

  KANBAN_COLABORADORES {
    text id PK
    text kanban_id FK
    text user_id FK
    timestamp adicionado_em
  }
```

## 3. Dicionário de dados (entidades principais)

### 3.1 `user`

Arquivo: `Back/src/database/drizzle/user.ts`

- **Chave**: `id` (CUID2)
- **Identificação**: `matricula` (único), `name`
- **Segurança**: `password` (hash; ver use case de autenticação)
- **Perfil**: `avatarUrl`, `turno` (`MANHA|TARDE|INTEGRAL`), `ativado`
- **Auditoria**: `createdAt`, `updatedAt`

### 3.2 `user_roles`

Arquivo: `Back/src/database/drizzle/user_roles.ts`

- N:N usuário ↔ role (PK composta `userId + role`)
- Roles: `TODOS`, `INFORMATICA`, `PJA`, etc. (`Back/src/database/drizzle/roles.ts`)

### 3.3 `Atividade`

Arquivo: `Back/src/database/drizzle/atividades.ts`

- **Chave**: `cod_atividade`
- `setor`, `descricao`, `tempo_medio`, `ativado`
- `usuarioId` referencia usuário que cadastrou

### 3.4 `tarefas`

Arquivo: `Back/src/database/drizzle/tarefas.ts`

- **Chave**: `id` (CUID2)
- `data` (texto), `item`, `cod_atividade` (FK), `qtd_folha`, `id_documento`
- Horários: `h_inicio` e `h_termino` (inteiros; regra de validação ocorre no use case/controller)
- `n_atendimento`, `ativado`
- `usuarioId` (FK)
- `createdAt`, `updatedAt`

### 3.5 `feedback`

Arquivo: `Back/src/database/drizzle/feedback.ts`

- `conteudo`, `status` (`ANALIZANDO|EM ANDAMENTO|CONCLUIDO|CANCELADO`), `nome` opcional
- `createdAt`, `updatedAt`

### 3.6 `grupos` e `user_grupos`

Arquivos:

- `Back/src/database/drizzle/grupos.ts`
- `Back/src/database/drizzle/user_grupo.ts`

Campos relevantes:

- Grupo guarda calendário esperado por arrays de inteiros:
  - `dias_empresa` e `dias_instituicao` (0–6, validado na rota)
- Vínculo usuário ↔ grupo com período (início/fim)

### 3.7 `presenca`

Arquivo: `Back/src/database/drizzle/presenca.ts`

- Chave: `id`
- `userId` + `data` com **unique constraint** (um registro por dia/usuário)
- `tipoEsperado`: `EMPRESA|INSTITUICAO|FOLGA|LIBERACAO`
- `status`: `PENDENTE|PRESENTE|ATRASADO|FALTA`
- `horaEntrada` opcional
- `origem`: `SISTEMA|MANUAL`

### 3.8 `analises_mensais`

Arquivo: `Back/src/database/drizzle/analiseMensal.ts`

Consolida por usuário/mês/ano:

- Esperado vs cumprido (empresa e instituição)
- `atrasos`
- Percentuais (`numeric(5,2)`)
- `selo`: `VERDE|VERMELHO|DOURADO`
- `gerado_em`

### 3.9 `kanban` e `kanban_colaboradores`

Arquivos:

- `Back/src/database/drizzle/kanbanAtividades.ts`
- `Back/src/database/drizzle/kanbanColaboradores.ts`

Kanban:

- Status: `TODO|IN_PROGRESS|DONE|CANCELED`
- Auditoria: criado/iniciado/finalizado/cancelado (por quem e quando)
- Associação opcional com `cod_atividade`

Colaboradores:

- unique `(kanban_id, user_id)` evita duplicidade

### 3.10 `media` e `media_roles`

Arquivos:

- `Back/src/database/drizzle/media.ts`
- `Back/src/database/drizzle/media_roles.ts`

Campos relevantes:

- `titulo`, `description`, `category` (setor) e `url`
- `costumerId` (FK user)
- `media_roles` define visibilidade por role (PK composta)

## 4. Regras de negócio relevantes no nível de dados

- **Presença diária única por usuário**: constraint unique em `presenca(userId, data)`.
- **Usuário**: matrícula única (`unique`).
- **Relacionamentos com cascade**:
  - Registros dependentes (tarefas, presenças, etc.) são removidos quando usuário é removido (FK com `onDelete: "cascade"` em algumas tabelas).
- **Kanban colaboradores**: unique `(kanbanId, userId)` evita duplicidade.

## 5. Migrações e evolução de schema

Padrão do projeto:

- `drizzle-kit generate` cria migrações em `Back/drizzle/*.sql`
- `drizzle-kit migrate` aplica migrações conforme `Back/drizzle.config.ts`

Recomendação operacional:

- Versionar migrações geradas (já ocorre no repo).
- Em ambientes (dev/stage/prod), executar migrações como etapa de deploy.

## Assumptions & Gaps

- A entidade `feedback` não tem relação explícita com `user` (autor) no schema atual; o campo `nome` é livre. Se o domínio exigir autoria rastreável, será necessário evoluir schema.
- O campo `tarefas.data` é string (não `date`), o que pode impactar consultas/índices; a motivação não está explícita no código.
