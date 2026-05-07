# SisTarefas — Visão Geral

## Sumário

- [1. Contexto de negócio](#1-contexto-de-negócio)
- [2. Escopo funcional atual (derivado do código)](#2-escopo-funcional-atual-derivado-do-código)
- [3. Glossário (termos de domínio)](#3-glossário-termos-de-domínio)
- [4. Matriz: módulo → objetivo → ator principal](#4-matriz-módulo--objetivo--ator-principal)
- [Assumptions & Gaps](#assumptions--gaps)

## 1. Contexto de negócio

O **SisTarefas** é um sistema full-stack para apoiar a rotina do **Programa de Jovem Aprendiz (PJA)**, permitindo:

- Registro e consulta de **tarefas/atividades diárias** realizadas pelos aprendizes.
- **Visão gerencial** (principalmente para o papel `INFORMATICA`) com métricas, relatórios e acompanhamento.
- Gestão de **grupos** e **presença** para consolidar **análises mensais** (“selos”).
- Um módulo de **Kanban** para organizar atividades em fluxo `TODO → IN_PROGRESS → DONE` (e cancelamento).
- Módulo de **Feedback** para entrada e tratamento de devolutivas.
- Módulo de **Mídia/Vídeos** para upload/listagem de conteúdos categorizados por setor.

> Rastreabilidade: rotas registradas no backend em `Back/src/app.ts` (prefixos `/user`, `/tarefas`, `/atividade`, `/feedback`, `/media`, `/grupos`, `/analise`, `/kanban`) e telas do front em `Front/src/pages/app/*`.

## 2. Escopo funcional atual (derivado do código)

### 2.1 Autenticação e perfil

- Login por **matrícula** + **senha**.
- Emissão de **JWT** com `sub = user.id` e claims `name`, `matricula`, `role`.
- Perfil do usuário autenticado (dados do usuário + role).

### 2.2 Tarefas (registro diário)

- Criar tarefa com data, item, código de atividade, documento, quantidade de folhas, horários e nº atendimento.
- Listar tarefas (por data) e buscar por intervalo.
- Buscar tarefa por ID e atualizar parcialmente.
- Métricas: contagem total, por setor, por código, top 5 atividades, média de tempo, total por mês, total geral.
- Geração de **PDF** a partir das tarefas.

### 2.3 Atividades (catálogo de códigos)

- Criar atividade/código (setor, descrição, tempo médio).
- Listar atividades cadastradas.

### 2.4 Feedback

- Criar feedback (conteúdo, status inicial, nome opcional).
- Listar feedbacks.
- Consultar feedback por ID.
- Atualizar status (restrição por papel aplicada no front; backend exige JWT).

### 2.5 Grupos e Presença

- Criar grupo (nome, dias de empresa e instituição, datas de início/fim).
- Vincular usuário a grupo; encerrar vínculo; trocar vínculo.
- Geração de presenças (job) e fechamento de pendências (job).
- Registro de entrada (hora) e alteração de status de presença.
- Consultas de presença por data, por período e por status.

### 2.6 Análises Mensais (“selos”)

- Criar análise mensal (por usuário, mês, ano).
- Consultar análises de um usuário.
- Consultar análises por período (mês/ano).
- Gerar PDF da análise mensal.

### 2.7 Kanban

- Criar item de kanban (título, descrição, código de atividade).
- Listar todos; listar por ID; listar por status.
- Atualizar detalhes.
- Transicionar status: `TODO → IN_PROGRESS → DONE` e cancelar/deletar.

### 2.8 Mídia (vídeos)

- Upload de mídia/arquivo e geração de URL.
- Criar registro de mídia com categoria.
- Listar mídias.

## 3. Glossário (termos de domínio)

- **PJA**: Programa de Jovem Aprendiz (contexto citado no `README.md` atual e nas telas).
- **Tarefa**: registro diário de execução (tabela `tarefas`) associado a um usuário e opcionalmente a um código de atividade.
- **Atividade / Código de atividade**: catálogo de atividades identificadas por `cod_atividade` (tabela `Atividade`).
- **Presença**: marcação diária por usuário (tabela `presenca`) com tipo esperado (empresa/instituição/folga/liberação), status e hora de entrada.
- **Grupo**: conjunto/escala que define dias esperados em empresa vs instituição (tabela `grupos`) e vínculos `user_grupos`.
- **Análise mensal / Selo**: consolidado mensal baseado em presenças esperadas/cumpridas e cálculo percentual; guarda `selo` (tabela `analises_mensais`).
- **Kanban**: quadro de acompanhamento de atividades (tabela `kanban`) com status e trilha de auditoria (criado/iniciado/finalizado/cancelado).
- **Role**: perfil de acesso do usuário (`roles`), ex. `INFORMATICA`, `PJA`, etc. (tabela `user_roles`).
- **Mídia**: conteúdo com `category` (setor) e `url`, associado ao usuário que criou (tabela `media` + `media_roles`).

## 4. Matriz: módulo → objetivo → ator principal

| Módulo | Objetivo | Ator principal (derivado do front) |
|---|---|---|
| Autenticação/Perfil | Acesso seguro e identificação do usuário | Todos |
| Tarefas | Registrar e consultar atividades diárias + relatórios | `PJA` e `INFORMATICA` |
| Atividades (códigos) | Manter catálogo de códigos/setores/descrições | `INFORMATICA` (provável) |
| Feedback | Coletar e tratar feedbacks com status | Todos (criar), `INFORMATICA` (atualizar status) |
| Grupos | Definir escala (dias empresa/instituição) e vínculos | `INFORMATICA` |
| Presença | Registrar e auditar presença e status por período | Todos (consulta), `INFORMATICA` (gestão) |
| Análises Mensais | Consolidar presença e gerar “selos” | Todos (consulta), `INFORMATICA` (visão global) |
| Kanban | Gerenciar itens e fluxo de execução | Todos (uso geral) |
| Mídia/Vídeos | Disponibilizar conteúdos por categoria | Todos (consumo), `INFORMATICA` (curadoria provável) |

## Assumptions & Gaps

- O repositório contém **duas representações de schema Drizzle**: `Back/drizzle/schema.ts` (gerado) e a fonte em `Back/src/database/drizzle/*.ts`. Esta documentação considera **`Back/src/database/drizzle` como fonte de verdade** por refletir enums e tabelas adicionais (presença, grupos, kanban, análises).
- A separação exata de permissões por `role` **não está centralizada no backend** (muitas rotas apenas exigem JWT). O front aplica algumas restrições (ex.: `INFORMATICA` para certas telas e ações), mas isso deve ser validado/enduricido no backend.
- A definição formal do que significa “PJA”, regras de cálculo de selo e dias esperados x cumpridos depende dos use cases (ex.: `Back/src/application/useCase/grupos/*` e `Back/src/application/useCase/analiseMensal/*`), que serão referenciados nas docs técnicas específicas.
