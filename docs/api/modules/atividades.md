# Módulo Atividades

Catálogo e gestão de atividades disponíveis no sistema.

## Objetivo

Manter um catálogo de atividades (tipos de trabalho) que podem ser associadas a tarefas.

## Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/atividade/create` | Criar nova atividade | ✅ |
| GET | `/atividade/list` | Listar atividades | ✅ |

## Entidade Atividade

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID único |
| `cod_atividade` | number | Código identificador |
| `setor` | string | Setor/departamento |
| `descricao` | string | Descrição da atividade |
| `tempo_medio` | number | Tempo médio (minutos) |
| `ativado` | boolean | Status |

## Exemplo de Uso

### Criar Atividade

```http
POST /atividade/create
Authorization: Bearer <token>

{
  "cod_atividade": 101,
  "setor": "Financeiro",
  "descricao": "Processamento de Notas Fiscais",
  "tempoMedio": 30,
  "ativado": true
}
```

### Listar Atividades

```http
GET /atividade/list
Authorization: Bearer <token>
```

**Resposta:**
```json
{
  "atividades": [
    {
      "id": "atv_abc123",
      "cod_atividade": 101,
      "setor": "Financeiro",
      "descricao": "Processamento de Notas Fiscais",
      "tempo_medio": 30,
      "ativado": true,
      "usuarioId": "usr_xyz789"
    }
  ],
  "total": 1
}
```

## Fluxos Comuns

1. **Admin cadastra atividades** → Usuários consultam ao criar tarefas
2. **Front carrega dropdown** → GET /atividade/list

## Restrições

- ✅ Apenas administradores podem criar atividades
- ✅ Código de atividade deve ser único
- ✅ Tempo médio é informativo para cálculos

---

Última atualização: Maio 6, 2026
