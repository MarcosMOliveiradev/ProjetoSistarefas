# Módulo Tarefas

Gestão completa de tarefas diárias, com métricas, análises e geração de relatórios.

## Objetivo

Registrar e consultar todas as atividades executadas por usuários, com cálculo de duração, produtividade e geração de relatórios em PDF.

## Principais Entidades

### Tarefa
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID único |
| `userId` | string | Usuário que criou |
| `data` | date | Data da tarefa (YYYY-MM-DD) |
| `item` | number | Número sequencial |
| `codAtividade` | number | Código da atividade (FK) |
| `idDocumento` | string | ID do documento processado |
| `qtdFolha` | number | Quantidade de folhas |
| `hInicioController` | string | Horário início (HH:MM) |
| `hTerminoController` | string | Horário término (HH:MM) |
| `nAtendimento` | number | Número de atendimento (opcional) |
| `ativado` | boolean | Status de ativação |
| `createdAt` | datetime | Data de criação |
| `updatedAt` | datetime | Data de atualização |

## Endpoints

### Criação
- `POST /tarefas/create` - Criar tarefa
- `POST /tarefas/update` - Atualizar tarefa
- `POST /tarefas/deletar` - Deletar/desativar tarefa

### Listagem e Busca
- `POST /tarefas/listaTarefas` - Listar tarefas de um usuário (com filtro de data)
- `GET /tarefas/find/:id` - Buscar tarefa por ID
- `POST /tarefas/search` - Busca avançada (por tipo e valor)
- `POST /tarefas/listbyinterval` - Listar por intervalo de datas

### Métricas
- `GET /tarefas/count/:userId` - Total de tarefas
- `GET /tarefas/averagetime/:userId` - Tempo médio por tarefa
- `GET /tarefas/topactive/:userId` - Top 5 atividades
- `GET /tarefas/totalmeses/:userId` - Total por mês
- `GET /tarefas/total` - Total do usuário autenticado

### Contadores
- `POST /tarefas/countdepartment` - Contar por setor
- `POST /tarefas/countcodigo` - Contar por código de atividade

### Relatórios
- `POST /tarefas/gerarPdf` - Gerar PDF com tarefas

## Fluxos Comuns

### 1. Registrar Atividade do Dia

```http
POST /tarefas/create
Content-Type: application/json
Authorization: Bearer <token>

{
  "data": "2026-05-06",
  "item": 1,
  "codAtividade": 101,
  "idDocumento": "NF-2026-0001",
  "qtdFolha": 12,
  "hInicioController": "08:00",
  "hTerminoController": "08:35",
  "nAtendimento": 12345
}
```

**Resposta (201):**
```json
{
  "tarefa": {
    "id": "trf_abc123",
    "userId": "usr_xyz789",
    "data": "2026-05-06",
    "item": 1,
    "codAtividade": 101,
    "idDocumento": "NF-2026-0001",
    "qtdFolha": 12,
    "hInicioController": "08:00",
    "hTerminoController": "08:35",
    "nAtendimento": 12345,
    "ativado": true,
    "createdAt": "2026-05-06T08:35:00Z",
    "updatedAt": "2026-05-06T08:35:00Z"
  }
}
```

### 2. Consultar Produtividade Diária

```http
POST /tarefas/listaTarefas
Content-Type: application/json
Authorization: Bearer <token>

{
  "dataB": "2026-05-06"
}
```

**Resposta (200):**
```json
{
  "tarefas": [
    { /* tarefas do dia */ }
  ],
  "total": 5
}
```

### 3. Analisar Produtividade Mensal

```http
GET /tarefas/count/usr_xyz789
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "count": 156
}
```

```http
GET /tarefas/averagetime/usr_xyz789
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "mediaMinutos": 32.5,
  "totalTarefas": 24
}
```

```http
GET /tarefas/topactive/usr_xyz789
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "top5": [
    {
      "codAtividade": 101,
      "descricao": "Processamento de NF",
      "total": 45
    },
    // ... mais 4 atividades
  ]
}
```

### 4. Gerar Relatório em PDF

```http
POST /tarefas/gerarPdf
Authorization: Bearer <token>
```

**Resposta (200):** Arquivo PDF (binary)

### 5. Buscar Tarefa por Documento

```http
POST /tarefas/search
Content-Type: application/json
Authorization: Bearer <token>

{
  "type": "documento",
  "value": "NF-2026-0001"
}
```

## Regras de Negócio

1. **Duração obrigatória:** Toda tarefa deve ter horário de início e término válidos
2. **Data retroativa:** Tarefas podem ser registradas em datas passadas
3. **Código de atividade:** Deve estar pré-cadastrado no módulo Atividades
4. **Soft delete:** Ao deletar, apenas marca como `ativado: false`
5. **Sem conflito de horário:** Uma mesma atividade pode ter múltiplos registros no mesmo dia
6. **Cálculo de duração:** Automático = (fim - início) em minutos

## Telas do Front que Usam

- **Dashboard de Tarefas** - Lista diária com filtro de data
- **Registro Rápido** - Formulário simplificado para entrada rápida
- **Relatório de Produtividade** - Gráficos com top 5 e totalizações
- **Exportar PDF** - Download de relatório em PDF

## Casos de Uso

| Caso | HTTP | Descrição |
|------|------|-----------|
| Registrar atividade | POST /create | User cria tarefa do dia |
| Listar atividades | POST /listaTarefas | User consulta tarefas |
| Editar atividade | PATCH /update | Corrigir informações |
| Remover atividade | POST /deletar | Soft delete de tarefa |
| Exportar relatório | POST /gerarPdf | Gerar PDF |
| Análise mensal | GET /totalmeses/:userId | Consultar histórico mensal |
| Top 5 atividades | GET /topactive/:userId | Identifica atividades mais executadas |

## Autenticação

🔒 **Todas as rotas requerem Bearer JWT**

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Status Codes Esperados

| Status | Casos |
|--------|-------|
| 201 | Criação bem-sucedida |
| 200 | Listagem, busca, cálculo |
| 204 | Deleção bem-sucedida |
| 400 | Validação (data inválida, horário inválido) |
| 401 | Token ausente/expirado |
| 404 | Tarefa não encontrada |
| 500 | Erro ao gerar PDF |

## Exemplo Completo de Integração

```javascript
// 1. Autenticar
const loginResponse = await fetch('/user/auth', {
  method: 'POST',
  body: JSON.stringify({
    matricula: 12345678,
    passwordBody: 'senha'
  })
});
const { token } = await loginResponse.json();

// 2. Criar tarefa
const taskResponse = await fetch('/tarefas/create', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    data: '2026-05-06',
    item: 1,
    codAtividade: 101,
    idDocumento: 'NF-2026-0001',
    qtdFolha: 12,
    hInicioController: '08:00',
    hTerminoController: '08:35',
    nAtendimento: 12345
  })
});

// 3. Listar tarefas do dia
const listResponse = await fetch('/tarefas/listaTarefas', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    dataB: '2026-05-06'
  })
});
const { tarefas } = await listResponse.json();
```

---

Última atualização: Maio 6, 2026
