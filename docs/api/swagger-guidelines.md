# Guia de Padrões Swagger/OpenAPI

Este documento define os padrões obrigatórios para documentação de novas rotas na API SisTarefas.

## Estrutura de Arquivos por Módulo

Cada módulo deve seguir a seguinte estrutura:

```
back/src/controller/<modulo>/
├── routes.ts        # Rotas limpas e legíveis
├── schemas.ts       # Schemas Zod reutilizáveis
├── examples.ts      # Exemplos realistas
├── docs.ts          # Documentação OpenAPI
└── *Controller.ts   # Lógica de negócio
```

## 1. schemas.ts - Definição de Tipos

Todas as validações Zod devem estar aqui.

### Padrão de Nomenclatura

- `create<Recurso>BodySchema` - Validação de entrada para POST/PATCH
- `update<Recurso>BodySchema` - Validação para atualização
- `<recurso>IdParamsSchema` - Parâmetros de rota com ID
- `<recurso>ResponseSchema` - Resposta única
- `list<Recursos>ResponseSchema` - Lista de respostas

### Exemplo

```typescript
// ❌ Ruim
export const bodySchema = z.object({
  name: z.string(),
  email: z.string()
});

// ✅ Bom
export const createUserBodySchema = z.object({
  name: z.string().min(3).describe('Nome completo do usuário.'),
  email: z.string().email().describe('Email válido.'),
});

export const userResponseSchema = z.object({
  id: z.string().describe('ID único.'),
  name: z.string().describe('Nome.'),
  email: z.string().describe('Email.'),
  createdAt: z.date().describe('Data de criação.'),
});
```

### Boas Práticas

- ✅ Use `.describe()` para documentar cada campo
- ✅ Use nomes longos e claros
- ✅ Reutilize schemas (não duplique)
- ✅ Exporte cada schema individualmente
- ❌ Não misture validação com documentação inline nas rotas

## 2. examples.ts - Dados Realistas

Contém exemplos para documentação do Swagger.

### Padrão

```typescript
// ❌ Ruim - Dados genéricos
export const userExample = {
  id: '123',
  name: 'User',
  email: 'user@email.com',
};

// ✅ Bom - Dados realistas e contextualizados
export const createUserExample = {
  name: 'João Silva',
  email: 'joao.silva@empresa.com',
};

export const userExample = {
  id: 'usr_abc123def456',
  name: 'João Silva',
  email: 'joao.silva@empresa.com',
  createdAt: '2026-05-06T10:00:00Z',
  updatedAt: '2026-05-06T14:20:00Z',
};

export const createUserResponseExample = {
  user: userExample,
};

export const listUsersResponseExample = {
  users: [userExample],
  total: 1,
};
```

### Dicas

- Use IDs que parecem reais (prefixo + sufixo): `usr_`, `trf_`, `fbk_`
- Datas em ISO 8601
- Use nomes e dados contextualizados
- Nenhum dado pessoal real
- Coerência entre exemplos

## 3. docs.ts - Documentação OpenAPI

Define os objetos de schema que vão direto para as rotas.

### Padrão Completo

```typescript
import { API_TAGS, bearerAuthSecurity } from '../../docs/commonTags.ts';
import { validationErrorResponseSchema, unauthorizedResponseSchema } from '../../docs/sharedSchemas.ts';
import { createUserBodySchema, userResponseSchema } from './schemas.ts';
import { createUserExample, userExample } from './examples.ts';

export const createUserRouteSchema = {
  tags: [API_TAGS.USER],
  summary: 'Criar nova conta de usuário',
  description: `
Cria uma nova conta de usuário no sistema.

**Quando usar:**
- Novo funcionário ingressando na empresa.
- Apenas administradores podem criar contas.

**Validações importantes:**
- Matrícula deve ser única.
- Senha deve ter no mínimo 6 caracteres.
  `,
  security: bearerAuthSecurity,
  body: createUserBodySchema,
  response: {
    201: userResponseSchema,
    400: validationErrorResponseSchema,
    401: unauthorizedResponseSchema,
  },
} as const;
```

### Checklist por Rota

- [ ] tags: Uma ou mais tags do API_TAGS
- [ ] summary: Frase curta e imperativa/descritiva
- [ ] description: Explicação em 3-5 linhas + contexto de uso
- [ ] security: bearerAuthSecurity se tiver onRequest: [verifyJwt]
- [ ] body: Schema de validação do body (se POST/PATCH)
- [ ] params: Schema de parâmetros de rota (se :id)
- [ ] querystring: Schema de query params (se ?param)
- [ ] response:
  - 2xx para sucesso (200, 201, 204)
  - 400 para validação
  - 401 se protegida
  - 403 se houver restrição de papel
  - 404 se buscar por ID
  - 409 se conflito de negócio
  - 500 se error inesperado relevante

## 4. routes.ts - Rotas Limpas

Deve importar tudo pronto e apenas registrar as rotas.

### Padrão

```typescript
// ❌ Ruim - Schemas inline
app.post('/create', {
  schema: {
    tags: ['User'],
    body: z.object({
      name: z.string(),
      email: z.string(),
      // ... 20 linhas de schema ...
    }),
    response: {
      201: z.object({ /* ... */ }),
      400: z.object({ /* ... */ }),
    }
  }
}, handler);

// ✅ Bom - Limpo e legível
import { createUserRouteSchema } from './docs.ts';
import { createUserController } from './createUser.ts';

app.post('/create', {
  schema: createUserRouteSchema,
}, async (request, reply) => {
  return createUserController(request, reply);
});
```

### Regras

- ✅ Cada rota em 4-5 linhas
- ✅ Importar schema pronto de docs.ts
- ✅ Um schema por rota
- ✅ Controllers sempre async
- ❌ Sem lógica inline
- ❌ Sem schema inline

## Padrões de Descrição

### Boa descrição responde:

1. **O que a rota faz?** Verbo + recurso
2. **Quem normalmente usa?** Contexto de negócio
3. **Qual efeito ela causa?** Side effects
4. **Quais regras importantes?** Validações críticas

### Exemplos

```typescript
// ❌ Ruim - Genérico
description: 'Cria um usuário'

// ✅ Bom - Completo
description: `
Cria uma nova conta de usuário no sistema.

**Quando usar:**
- Novo funcionário ingressando na empresa.
- Apenas administradores podem criar contas.

**Validações importantes:**
- Matrícula deve ser única no sistema.
- Senha deve ter no mínimo 6 caracteres.
- Turno e papel devem estar predefinidos.
`,
```

## Reutilizando Schemas Comuns

### Schemas Compartilhados (back/src/docs/sharedSchemas.ts)

```typescript
// Sempre use estes quando aplicável:
✅ successMessageResponseSchema      // { message: string }
✅ validationErrorResponseSchema     // { error: 'VALIDATION_ERROR', ... }
✅ unauthorizedResponseSchema        // { error: 'UNAUTHORIZED', ... }
✅ forbiddenResponseSchema           // { error: 'FORBIDDEN', ... }
✅ notFoundResponseSchema            // { error: 'NOT_FOUND', ... }
✅ conflictResponseSchema            // { error: 'CONFLICT', ... }
✅ internalServerErrorResponseSchema // { error: 'INTERNAL_SERVER_ERROR', ... }
```

### Quando Criar Nova Response

Só crie schemas de response específicos quando:
- A estrutura é única do módulo
- Será reutilizada em múltiplos endpoints
- Não se encaixa em erro padrão

## Tags Padrão (API_TAGS)

Use sempre:

```typescript
API_TAGS.USER              // Autenticação e perfil
API_TAGS.TAREFAS           // Registro de atividades
API_TAGS.ATIVIDADES        // Catálogo de atividades
API_TAGS.FEEDBACK          // Sistema de feedback
API_TAGS.MEDIA             // Upload de arquivos
API_TAGS.GRUPOS            // Gestão de grupos
API_TAGS.PRESENÇAS         // Presenças em grupos
API_TAGS.ANÁLISE_MENSAL    // Análises e relatórios
API_TAGS.KANBAN            // Quadro kanban
```

## Security

Se a rota usa `onRequest: [verifyJwt]`:

```typescript
✅ security: bearerAuthSecurity,  // Sempre incluir
✅ response: {
  200: schema,
  401: unauthorizedResponseSchema, // Sempre incluir
  // ... outras respostas
}
```

## Testes de Documentação

### Checklist Final

- [ ] Rota compila sem erros TypeScript
- [ ] Summary é imperatcivo ou descritivo (não pergunta)
- [ ] Description tem contexto de uso
- [ ] Body tem .describe() em cada campo
- [ ] Params tem .describe()
- [ ] Respostas cobrem casos comuns (201, 400, 401, 404)
- [ ] Exemplos são realistas e válidos
- [ ] Não há IDs ou valores genéricos em exemplos
- [ ] Swagger renderiza em `/docs` sem erros
- [ ] Histórico de requisição no Swagger funciona

## Ferramentas

### Validar OpenAPI Gerada

```bash
# Instalar
npm install --save-dev @apidevtools/swagger-parser

# Validar
npx swagger-parser validate <arquivo.json>
```

### Formatar Código

```bash
# Prettier (já configurado)
npm run format

# ESLint
npm run lint
```

## Exemplos por Tipo

### Criar (POST)

```typescript
export const createTarefaRouteSchema = {
  tags: [API_TAGS.TAREFAS],
  summary: 'Criar nova tarefa',
  description: '...',
  security: bearerAuthSecurity,
  body: createTarefaBodySchema,
  response: {
    201: createTarefaResponseSchema,
    400: validationErrorResponseSchema,
    401: unauthorizedResponseSchema,
  },
} as const;
```

### Listar (GET)

```typescript
export const listTarefasRouteSchema = {
  tags: [API_TAGS.TAREFAS],
  summary: 'Listar tarefas do usuário',
  description: '...',
  security: bearerAuthSecurity,
  response: {
    200: listTarefasResponseSchema,
    401: unauthorizedResponseSchema,
  },
} as const;
```

### Buscar (GET com ID)

```typescript
export const findTarefaByIdRouteSchema = {
  tags: [API_TAGS.TAREFAS],
  summary: 'Buscar tarefa pelo ID',
  description: '...',
  security: bearerAuthSecurity,
  params: tarefaIdParamsSchema,
  response: {
    200: tarefaResponseSchema,
    401: unauthorizedResponseSchema,
    404: notFoundResponseSchema,
  },
} as const;
```

### Atualizar (PATCH)

```typescript
export const updateTarefaRouteSchema = {
  tags: [API_TAGS.TAREFAS],
  summary: 'Atualizar tarefa',
  description: '...',
  security: bearerAuthSecurity,
  body: updateTarefaBodySchema,
  response: {
    200: tarefaResponseSchema,
    400: validationErrorResponseSchema,
    401: unauthorizedResponseSchema,
    404: notFoundResponseSchema,
  },
} as const;
```

### Deletar (DELETE)

```typescript
export const deleteTarefaRouteSchema = {
  tags: [API_TAGS.TAREFAS],
  summary: 'Deletar tarefa',
  description: '...',
  security: bearerAuthSecurity,
  response: {
    204: { description: 'Tarefa deletada com sucesso.' },
    401: unauthorizedResponseSchema,
    404: notFoundResponseSchema,
  },
} as const;
```

---

Última atualização: Maio 6, 2026
