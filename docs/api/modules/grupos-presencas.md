# Módulo Grupos e Presenças

Gestão de grupos de trabalho e controle de presença dos colaboradores.

## Objetivo

Organizar usuários em grupos, registrar presenças e gerenciar vínculos de usuários com grupos.

## Principais Entidades

### Grupo
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID único do grupo |
| `nome` | string | Nome do grupo |
| `dataInicio` | date | Data de início do grupo |
| `dataFim` | date|null | Data de término do grupo |
| `diasEmpresa` | number[] | Dias úteis na empresa |
| `diasInstituicao` | number[] | Dias úteis na instituição |

### Presença
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID único da presença |
| `userId` | string | ID do usuário |
| `tipoEsperado` | string | Tipo de presença esperado |
| `data` | date | Data da presença |
| `origem` | string | Origem do registro |
| `status` | string | Status atual da presença |
| `horaEntrada` | string|null | Hora de entrada registrada |

## Endpoints

### Grupos (CRUD)

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/grupos/create` | Criar novo grupo | ✅ |
| GET | `/grupos/find` | Listar grupos | ✅ |
| GET | `/grupos/find/:id` | Buscar grupo por ID | ✅ |
| DELETE | `/grupos/delete/:id` | Deletar grupo | ✅ |
| GET | `/grupos/updatependentes` | Atualizar pendentes | ✅ |

### Gestão de Vínculo

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/grupos/vincular` | Vincular usuário a um grupo | ✅ |
| POST | `/grupos/encerrarvinculo` | Encerrar vínculo de usuário | ✅ |
| POST | `/grupos/trocarvinculo` | Trocar usuário para outro grupo | ✅ |

### Presenças

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/grupos/createpresenca` | Registrar presença | ✅ |
| POST | `/grupos/findfordate` | Buscar presenças por data | ✅ |
| POST | `/grupos/findbystatus` | Buscar presenças por status | ✅ |
| POST | `/grupos/findbyperiod` | Buscar presenças por período | ✅ |
| GET | `/grupos/presencauser` | Histórico de presença do usuário autenticado | ✅ |
| POST | `/grupos/registrar` | Registrar hora de entrada | ✅ |
| PATCH | `/grupos/updatestatus` | Atualizar status de presença | ✅ |

## Requisições Principais

### Criar grupo

```http
POST /grupos/create
Authorization: Bearer <token>

{
  "nome": "Processamento Financeiro",
  "diasEmpresa": [1, 2, 3, 4, 5],
  "diasInstituicao": [1, 2, 3, 4],
  "dataInicio": "2026-05-01",
  "dataFim": "2026-12-31"
}
```

### Vincular usuário ao grupo

```http
POST /grupos/vincular
Authorization: Bearer <token>

{
  "userId": "usr_xyz789",
  "grupoId": "grp_abc123",
  "dataInicio": "2026-05-01",
  "dataFim": "2026-12-31"
}
```

### Registrar presença

```http
POST /grupos/createpresenca
Authorization: Bearer <token>

{
  "userId": "usr_xyz789",
  "data": "2026-05-06",
  "origem": "MANUAL"
}
```

### Buscar presenças por data

```http
POST /grupos/findfordate
Authorization: Bearer <token>

{
  "date": "2026-05-06"
}
```

### Buscar presenças por status

```http
POST /grupos/findbystatus
Authorization: Bearer <token>

{
  "status": "PRESENTE",
  "inicio": "2026-05-01",
  "fim": "2026-05-31"
}
```

### Buscar presenças por período

```http
POST /grupos/findbyperiod
Authorization: Bearer <token>

{
  "userId": "usr_xyz789",
  "inicio": "2026-05-01",
  "fim": "2026-05-31"
}
```

### Histórico de presença do usuário autenticado

```http
GET /grupos/presencauser
Authorization: Bearer <token>
```

### Registrar hora de entrada

```http
POST /grupos/registrar
Authorization: Bearer <token>

{
  "presencaId": "pres_abc123",
  "horaEntrada": "08:05"
}
```

### Atualizar status de presença

```http
PATCH /grupos/updatestatus
Authorization: Bearer <token>

{
  "presencaId": "pres_abc123",
  "status": "FALTA"
}
```

### Encerrar vínculo de usuário

```http
POST /grupos/encerrarvinculo
Authorization: Bearer <token>

{
  "userId": "usr_xyz789",
  "dataFim": "2026-05-31"
}
```

### Trocar usuário para outro grupo

```http
POST /grupos/trocarvinculo
Authorization: Bearer <token>

{
  "userId": "usr_xyz789",
  "novoGrupoId": "grp_def456",
  "dataInicio": "2026-06-01"
}
```

### Buscar grupo por ID

```http
GET /grupos/find/:id
Authorization: Bearer <token>
```

### Deletar grupo

```http
DELETE /grupos/delete/:id
Authorization: Bearer <token>
```

## Notas de Implementação

- O prefixo do módulo é `/grupos`.
- A maioria das operações exige autenticação JWT.
- Os endpoints de presença estão organizados em gravação e consulta.
- `find/:id` retorna dados do grupo solicitado.
- `updatependentes` executa rotina de atualização de presenças pendentes.

## Status Codes

| Status | Casos |
|--------|-------|
| 200 | Consulta e atualização |
| 201 | Criação |
| 400 | Validação |
| 401 | Não autenticado |
| 403 | Não autorizado |
| 404 | Não encontrado |
| 500 | Erro interno |

| 204 | Deleção |
| 400 | Validação |
| 401 | Token inválido |
| 404 | Grupo/Presença não encontrada |
| 409 | Conflito (presença duplicada) |

---

Última atualização: Maio 6, 2026
