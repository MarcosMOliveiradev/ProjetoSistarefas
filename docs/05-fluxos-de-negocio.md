# Fluxos de Negócio (ponta a ponta)

## Sumário

- [1. Login e perfil](#1-login-e-perfil)
- [2. Registro e listagem de tarefas](#2-registro-e-listagem-de-tarefas)
- [3. Relatórios e métricas](#3-relatórios-e-métricas)
- [4. Gestão de grupos e presença](#4-gestão-de-grupos-e-presença)
- [5. Kanban (criar, iniciar, concluir, cancelar)](#5-kanban-criar-iniciar-concluir-cancelar)
- [6. Análises mensais](#6-análises-mensais)
- [Assumptions & Gaps](#assumptions--gaps)

## 1. Login e perfil

### Passo a passo

1) Usuário acessa a tela de login (`Front/src/pages/auth/sign-in.tsx`).

2) Front envia credenciais:

- `POST /user/auth` com `{ matricula, passwordBody }` (ver `Front/src/context/authContext.tsx`).

3) Back-end valida usuário/senha e assina JWT:

- `Back/src/controller/user/authenticate.ts`
- JWT inclui `sub=user.id` e claim `role` (usado no front para habilitar recursos).

4) Front carrega o perfil:

- `GET /user/profile` com header `Authorization: Bearer <token>`

5) Front persiste token e habilita rotas privadas:

- Storage: `Front/src/stora/storaAuth.ts`
- Rotas: `Front/src/pages/rotes.tsx`

### Entradas, saídas e validações

- **Entrada**: matrícula numérica e senha
- **Saída**: token JWT + perfil do usuário
- **Validações**:
  - back-end: usuário existente e senha correta
  - front: trata erro via `AppErrors` e exibe toast

## 2. Registro e listagem de tarefas

### 2.1 Registrar tarefa

1) Usuário acessa `Atividades` (`Front/src/pages/app/Atividades.tsx`).
2) Abre modal de criação (`Front/src/components/criarAtividadeButton.tsx`).
3) Envia:

- `POST /tarefas/create` com campos como `data`, `codAtividade`, horários, etc.

4) Back-end usa `request.user.sub` como `userId` (derivado do JWT) e cria no banco.

Validação importante:

- Há validação de formato de hora no use case/controller (erro `FormatoHoraErrado`).

### 2.2 Listar tarefas por dia / intervalo

Via componente de calendário `DataPicker` (`Front/src/components/dataPicker.tsx`):

- Por dia: `POST /tarefas/listaTarefas` com `{ dataB: "YYYY-MM-DD" }` (ou similar)
- Por intervalo: `POST /tarefas/listbyinterval` com `{ startDate, endDate }`

### 2.3 Atualizar e desativar tarefa

- Atualizar: `PATCH /tarefas/update` (`Front/src/components/updateTarefas.tsx`)
- “Deletar” (soft): `POST /tarefas/deletar` com `{ id, ativado }` (`Front/src/components/tabelaAtividades.tsx`)

## 3. Relatórios e métricas

### 3.1 Dashboard (indicadores)

Tela `Dashboard` (`Front/src/pages/app/dashboard.tsx`) combina:

- Catálogo de atividades: `GET /atividade/list`
- Métricas por usuário:
  - Total do usuário: `GET /tarefas/count/:userId`
  - Média: `GET /tarefas/averagetime/:userId`
  - Top 5: `GET /tarefas/topactive/:userId`
  - Total mês a mês: `GET /tarefas/totalmeses/:userId`
  - Contagem por setor: `POST /tarefas/countdepartment`
  - Contagem por código: `POST /tarefas/countcodigo`
- Métrica global:
  - Total geral: `GET /tarefas/total`

Comportamento por role:

- Quando `role === 'INFORMATICA'`, a tela habilita seleção de usuário (lista via `GET /user/find`).

### 3.2 Exportar PDF de tarefas

O `DataPicker` chama:

- `POST /tarefas/gerarPdf` e espera `application/pdf`.

O back-end monta o PDF e devolve buffer (ver `Back/src/controller/tarefas/routes.ts` e controller `Back/src/controller/tarefas/gerarPDF.ts`).

## 4. Gestão de grupos e presença

### 4.1 Criar grupo

Tela `GerenciarGrupos` (`Front/src/pages/app/GerenciarGrupos.tsx`) abre `CriarGrupos`:

- `POST /grupos/create` com:
  - `nome`
  - `diasEmpresa[]` / `diasInstituicao[]` (0–6)
  - `dataInicio` (e opcional `dataFim`)

### 4.2 Vincular usuário a grupo / encerrar vínculo / trocar vínculo

Componentes:

- Vincular: `Front/src/components/VincularUsuarioDialog.tsx` → `POST /grupos/vincular`
- Encerrar: `Front/src/components/UpdateUser.tsx` → `POST /grupos/encerrarvinculo`
- Trocar: `POST /grupos/trocarvinculo` (rota existe; uso no front não identificado nos trechos lidos)

### 4.3 Geração e fechamento de presenças (automação)

Jobs no backend (importados em `Back/src/app.ts`):

- `criaPresencaJob`: gera presenças do dia às 06:30
- `fechaPresencaJob`: fecha pendências às 17:20

### 4.4 Registrar entrada (presença)

Fluxo usado pelo front em `Front/src/api/registraEntrada.ts`:

1) Busca presença do dia:
   - `POST /grupos/findfordate` com `{ date: new Date() }`
2) Registra hora:
   - `POST /grupos/registrar` com `{ presencaId, horaEntrada: "H:M" }`

### 4.5 Consultar presença por período

Tela `ConsultarPresenca` (`Front/src/pages/app/ConsultarPresenca.tsx`):

- `POST /grupos/findbyperiod` com `{ userId, inicio, fim }`
- Para `INFORMATICA`, habilita seleção de usuário via `GET /user/find`
- Ação “REMOVER PENDENCIA”:
  - `GET /grupos/updatependentes` (invalida cache e recarrega)

### 4.6 Gerenciar presença por status

Tela `GerenciaPresenca` (`Front/src/pages/app/GerenciaPresenca.tsx`):

- `POST /grupos/findbystatus` com `{ status, inicio, fim }`
- Alterar status:
  - modal `AtualizarStatusPresencaDialog` → `PATCH /grupos/updatestatus` com `{ presencaId, status }`

## 5. Kanban (criar, iniciar, concluir, cancelar)

### 5.1 Criar item

Componente `CriarKanban`:

- `POST /kanban/create` com `{ titulo, descricao, codAtividades }`

### 5.2 Listar e visualizar colunas

Tela `Kanban` (`Front/src/pages/app/Kanban.tsx`):

- `GET /kanban/findall`
- Colunas são filtradas por `status` no client (`TODO`, `IN_PROGRESS`, `DONE`)

### 5.3 Mover card (D&D) com UI otimista

No `onDragEnd`:

- Atualiza cache local primeiro (optimistic UI)
- Confirma no back:
  - mover para `IN_PROGRESS`: `PATCH /kanban/in_progress` com `{ id, userId }`
  - mover para `DONE`: `PATCH /kanban/finish` com `{ id, userId }`
- Se falhar, reverte cache

Regras de bloqueio no client:

- Não permite `IN_PROGRESS → TODO` (comentado no código)

### 5.4 Cancelar / editar detalhes

- Cancelar: `PATCH /kanban/cancel` com `{ id, userId, motivo? }` (componente `CancelarKanbanDialog`)
- Atualizar detalhes: `PATCH /kanban/updatedetails` (`KanbanDetalhesDialog`)

## 6. Análises mensais

### 6.1 Criar análise (“selo”) por usuário/mês/ano

Componente `CriarSelo`:

- `POST /analise/create` com `{ userId, mes, ano }`

### 6.2 Consultar análises do usuário

Tela `AnaliseMensal` (`Front/src/pages/app/AnaliseMensal.tsx`):

- `POST /analise/find` com `{ userId }`
- Para `INFORMATICA`, habilita seleção de usuário (lista via `GET /user/find`)

### 6.3 Consultar análises por período (visão global)

Tela `AnalisesMensais` (`Front/src/pages/app/analisesMensais.tsx`):

- `POST /analise/findAnalises` com `{ mes, ano }`

### 6.4 Contagem de análises

`AppLayout` chama:

- `GET /analise/count/:usuarioId`

## Assumptions & Gaps

- A regra de cálculo de percentuais e selo depende dos use cases do backend (`Back/src/application/useCase/analiseMensal/*`) — não detalhada aqui por não estar centralizada em um único arquivo.
- O fluxo de “relatório PDF de análise mensal” existe no backend (`POST /analise/pdf`), mas o front tem o botão de baixar PDF comentado na tela `AnaliseMensal`.
