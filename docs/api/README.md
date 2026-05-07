# API SisTarefas - Documentação

Bem-vindo à documentação da API **SisTarefas**, plataforma completa de gestão de tarefas, atividades e presença.

## Informações Gerais

- **Versão:** 2.0.0
- **URL Base (Desenvolvimento):** `http://localhost:3000`
- **URL Base (Produção):** `https://api.sistarefas.com`
- **Documentação Interativa:** [`http://localhost:3000/docs`](http://localhost:3000/docs)

## Autenticação

### Bearer Token (JWT)

Todas as rotas marcadas com 🔒 requerem autenticação.

**Como autenticar:**

1. Faça login via `POST /user/auth` com matrícula e senha
2. Guarde o token retornado
3. Inclua em todas as requisições futuras:
   ```http
   Authorization: Bearer <seu_token>
   ```

**Validade do token:** 4 horas

### Exemplo de Login

```bash
curl -X POST http://localhost:3000/user/auth \
  -H "Content-Type: application/json" \
  -d '{
    "matricula": 12345678,
    "passwordBody": "sua_senha"
  }'
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Status Codes HTTP

| Código | Significado | Descrição |
|--------|------------|-----------|
| **200** | OK | Requisição bem-sucedida |
| **201** | Created | Recurso criado com sucesso |
| **204** | No Content | Operação bem-sucedida sem retorno de dados |
| **400** | Bad Request | Validação falhou ou parâmetros inválidos |
| **401** | Unauthorized | Token ausente, inválido ou expirado |
| **403** | Forbidden | Acesso negado por falta de permissão |
| **404** | Not Found | Recurso não encontrado |
| **409** | Conflict | Conflito de regra de negócio |
| **500** | Internal Server Error | Erro inesperado no servidor |

## Estrutura de Resposta

### Sucesso (200/201)

```json
{
  "data": {}
}
```

### Erro (4xx/5xx)

```json
{
  "error": "ERROR_TYPE",
  "message": "Descrição do erro",
  "statusCode": 400,
  "details": {}
}
```

## Módulos da API

| Módulo | Descrição | Endpoints |
|--------|-----------|-----------|
| **[User](./modules/user.md)** | Autenticação, perfil e gestão de usuários | 9 endpoints |
| **[Tarefas](./modules/tarefas.md)** | Registro e análise de atividades diárias | 16 endpoints |
| **[Atividades](./modules/atividades.md)** | Catálogo de atividades disponíveis | 2 endpoints |
| **[Feedback](./modules/feedback.md)** | Sistema de feedback de usuários | 4 endpoints |
| **[Media](./modules/media.md)** | Upload e gestão de arquivos | 3 endpoints |
| **[Grupos](./modules/grupos-presencas.md)** | Gestão de grupos e presenças | 15 endpoints |
| **[Kanban](./modules/kanban.md)** | Quadro de tarefas em formato kanban | 9 endpoints |
| **[Análise Mensal](./modules/analise-mensal.md)** | Relatórios e métricas mensais | 5 endpoints |

## Como Usar a Documentação

1. **Para explorar visualmente:** Acesse [`/docs`](http://localhost:3000/docs) no navegador
2. **Para entender cada módulo:** Leia os arquivos em `modules/`
3. **Para padrões de desenvolvimento:** Veja [swagger-guidelines.md](./swagger-guidelines.md)

## Padrões de Nomenclatura

### Endpoints

- **GET:** Recuperar dados (sem efeito colateral)
- **POST:** Criar recurso ou executar ação
- **PUT/PATCH:** Atualizar recurso
- **DELETE:** Remover recurso

### Convenção de Nomes

- **Recursos no plural:** `/tarefas`, `/usuarios`, `/feedbacks`
- **Ações específicas:** `/tarefas/search`, `/kanban/finalize`
- **IDs em params:** `/tarefas/{id}`, `/usuarios/{userId}`

## Fluxos Comuns

### 1. Registrar Tarefa Diária

```
1. POST /user/auth → Obter token
2. GET /atividade/list → Listar atividades disponíveis
3. POST /tarefas/create → Registrar nova tarefa
```

### 2. Consultar Produtividade

```
1. POST /user/auth → Autenticar
2. GET /tarefas/count/:userId → Total de tarefas
3. GET /tarefas/averagetime/:userId → Tempo médio
4. GET /tarefas/topactive/:userId → Top 5 atividades
```

### 3. Gerar Relatório

```
1. POST /user/auth → Autenticar
2. POST /tarefas/listbyinterval → Filtrar por período
3. POST /tarefas/gerarPdf → Gerar PDF
```

## Tratamento de Erros

### Erro de Validação

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Erro ao validar body",
  "details": {
    "codAtividade": ["Expected number, received string"]
  }
}
```

### Erro de Autenticação

```json
{
  "error": "UNAUTHORIZED",
  "message": "Token ausente, inválido ou expirado."
}
```

### Erro de Negócio

```json
{
  "error": "CONFLICT",
  "message": "Matrícula já existe no sistema."
}
```

## Contribuindo

Para adicionar novas rotas ou endpoints:

1. Siga os padrões em [swagger-guidelines.md](./swagger-guidelines.md)
2. Crie `schemas.ts`, `examples.ts` e `docs.ts` em seu módulo
3. Importe os schemas no `routes.ts`
4. Documente a rota completa com tags, summary e description
5. Adicione exemplos realistas

## Suporte

- **Issues:** [GitHub Issues](https://github.com/MarcosMOliveiradev/ProjetoSistarefas/issues)
- **Discussões:** [GitHub Discussions](https://github.com/MarcosMOliveiradev/ProjetoSistarefas/discussions)

## Changelog

### v2.0.0 (Maio 2026)

- ✨ Refatoração completa da documentação Swagger/OpenAPI
- ✨ Separação de schemas em arquivos dedicados
- ✨ Exemplos realistas para cada endpoint
- 🐛 Correção de tags e descriptions inconsistentes
- 📚 Documentação externa completa

---

Última atualização: Maio 6, 2026
