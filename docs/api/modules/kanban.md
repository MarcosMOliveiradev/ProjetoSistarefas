# Módulo Kanban

Gestão de tarefas em formato de quadro kanban.

## Objetivo

Organizar tarefas em fluxo visual com estados (Pendente → Iniciado → Concluído/Cancelado).

## Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/kanban/create` | Criar tarefa | ✅ |
| GET | `/kanban/findall` | Listar todas | ✅ |
| GET | `/kanban/find/:id` | Buscar por ID | ✅ |
| GET | `/kanban/findbystatus/:status` | Filtrar por status | ✅ |
| PATCH | `/kanban/updatedetails` | Atualizar detalhes | ✅ |
| PATCH | `/kanban/in_progress` | Iniciar | ✅ |
| PATCH | `/kanban/finish` | Concluir | ✅ |
| PATCH | `/kanban/cancel` | Cancelar | ✅ |
| DELETE | `/kanban/delete` | Deletar | ✅ |

## Status

- `PENDENTE` - Inicial, aguardando execução
- `INICIADO` - Em execução
- `CONCLUÍDO` - Finalizado com sucesso
- `CANCELADO` - Cancelado/interrompido

## Fluxo Padrão

```
PENDENTE → INICIADO → CONCLUÍDO
           ↓
         CANCELADO
```

## Exemplo de Uso

### Criar Tarefa Kanban

```http
POST /kanban/create
Authorization: Bearer <token>

{
  "titulo": "Implementar novo relatório",
  "descricao": "Criar relatório de produtividade mensal",
  "codAtividades": 105
}
```

### Iniciar Execução

```http
PATCH /kanban/in_progress
Authorization: Bearer <token>

{
  "id": "kan_abc123"
}
```

### Concluir

```http
PATCH /kanban/finish
Authorization: Bearer <token>

{
  "id": "kan_abc123"
}
```

### Listar por Status

```http
GET /kanban/findbystatus/PENDENTE
Authorization: Bearer <token>
```

---

Última atualização: Maio 6, 2026
