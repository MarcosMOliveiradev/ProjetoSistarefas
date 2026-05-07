# Módulo User

Autenticação de usuários, gestão de perfil e administração de contas.

## Objetivo

Gerenciar autenticação, autorização e dados de perfil dos usuários no sistema.

## Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/user/auth` | Login / autenticação | ❌ |
| POST | `/user/created` | Criar novo usuário | ✅ |
| GET | `/user/profile` | Obter perfil do usuário | ✅ |
| PUT | `/user/update-password` | Alterar senha | ✅ |
| POST | `/user/file` | Upload de avatar | ✅ |
| PUT | `/user/avataurl` | Atualizar URL do avatar | ✅ |
| GET | `/user/find` | Listar usuários | ✅ |
| GET | `/user/findid/:id` | Buscar usuário por ID | ✅ |
| POST | `/user/updateuser` | Atualizar dados do usuário | ✅ |

## Fluxo de Autenticação

1. **Login**
   ```http
   POST /user/auth
   {
     "matricula": 12345678,
     "passwordBody": "senha123"
   }
   ```
   Retorna: `{ "token": "eyJhb..." }`

2. **Usar token**
   ```http
   Authorization: Bearer eyJhb...
   ```

3. **Token expires em:** 4 horas

## Criar Usuário (Admin only)

```http
POST /user/created
Authorization: Bearer <token>

{
  "name": "João Silva",
  "matricula": 98765432,
  "passwordBody": "senhaSegura123",
  "avatarUrl": "https://...",
  "turno": "MATUTINO",
  "role": "USER"
}
```

## Turno enum

- MATUTINO
- VESPERTINO
- NOTURNO

## Role enum

- USER
- ADMIN
- GESTOR
- TI

## Fluxos Comuns

### 1. Novo Usuário Login
```
1. POST /user/auth → obtém token
2. GET /user/profile → consulta perfil
```

### 2. Administrador Cria Usuário
```
1. POST /user/auth → admin faz login
2. POST /user/created → cria novo usuário
3. Novo usuário recebe matrícula e senha temporária
```

### 3. Usuário Altera Avatar
```
1. POST /user/file → upload da imagem
2. PUT /user/avataurl → salva URL do avatar
```

## Status Codes

| Status | Significado |
|--------|------------|
| 200/201 | Sucesso |
| 400 | Validação falhou |
| 401 | Token inválido/expirado |
| 409 | Matrícula já existe |

---

Última atualização: Maio 6, 2026
