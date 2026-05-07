# Módulo Feedback

Sistema para coleta e gestão de feedback de usuários.

## Objetivo

Permitir que usuários reportem problemas, sugestões e melhorias no sistema.

## Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/feedback/create` | Criar feedback | ❌ |
| GET | `/feedback/list` | Listar feedbacks | ❌ |
| GET | `/feedback/list/:id` | Buscar feedback | ✅ |
| PATCH | `/feedback/updateStatus` | Atualizar status | ✅ |

## Status de Feedback

- `ANALIZANDO` - Novo, em análise
- `RESOLVIDO` - Problema resolvido
- `REJEITADO` - Não será implementado

## Exemplo de Uso

### Enviar Feedback

```http
POST /feedback/create

{
  "conteudo": "A interface poderia ser mais intuitiva",
  "status": "ANALIZANDO",
  "nome": "João Silva"
}
```

### Listar Feedbacks

```http
GET /feedback/list
```

### Atualizar Status

```http
PATCH /feedback/updateStatus
Authorization: Bearer <token>

{
  "id": "fbk_abc123",
  "status": "RESOLVIDO"
}
```

## Fluxos Comuns

1. **Usuário envia feedback** → POST /feedback/create
2. **Admin revisa** → GET /feedback/list
3. **Admin responde** → PATCH /feedback/updateStatus

---

Última atualização: Maio 6, 2026
