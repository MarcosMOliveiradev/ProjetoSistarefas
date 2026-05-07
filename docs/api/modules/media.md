# Módulo Media

Upload e gestão de arquivos (imagens, documentos, etc).

## Objetivo

Gerenciar arquivos de mídia associados a usuários e recursos.

## Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/media/create` | Cadastrar mídia | ✅ |
| POST | `/media/file` | Upload de arquivo | ✅ |
| GET | `/media/list` | Listar mídias | ✅ |

## Exemplo de Uso

### Upload de Arquivo

```http
POST /media/file
Authorization: Bearer <token>
Content-Type: multipart/form-data

[arquivo binário]
```

**Resposta:**
```json
{
  "url": "https://api.sistarefas.com/uploads/arquivo-123.pdf"
}
```

### Cadastrar Mídia

```http
POST /media/create
Authorization: Bearer <token>

{
  "url": "https://api.sistarefas.com/uploads/arquivo-123.pdf",
  "descricao": "Relatório mensal",
  "tipo": "documento"
}
```

### Listar Mídias

```http
GET /media/list
Authorization: Bearer <token>
```

## Tipos Suportados

- `imagem` - PNG, JPG, GIF
- `documento` - PDF, DOC, DOCX
- `video` - MP4, AVI

---

Última atualização: Maio 6, 2026
