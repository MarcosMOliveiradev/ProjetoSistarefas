import { FastifyRequest, FastifyReply } from 'fastify'
import { createWriteStream } from 'node:fs'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'
import { extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { env } from '../lib/env.ts'

const pump = promisify(pipeline)

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename)

function normalizeFileName(fileName: string) {
  const extension = extname(fileName)

  const baseName = fileName
    .replace(extension, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-zA-Z0-9-_]/g, "_") // troca caracteres especiais
    .replace(/_+/g, "_") // evita vários _ seguidos
    .replace(/^_|_$/g, "") // remove _ do início/fim
    .toLowerCase()

  return `${baseName}${extension.toLowerCase()}`
}

export class MediaController {
  async uploadMedia(request: FastifyRequest, reply: FastifyReply) {
    const file = await request.file()

    if (!file) {
      throw new Error("No file uploaded")
    }

    const random = Math.floor(100000 + Math.random() * 900000).toString()

    // Normaliza o nome do arquivo
    const normalizedName = normalizeFileName(file.filename)

    const name = `${random}-${normalizedName}`

    const filePath = resolve(__dirname, "../../../uploads", name)

    const writeStream = createWriteStream(filePath)

    await pump(file.file, writeStream)

    const fullURL = `${request.protocol}://${request.hostname}:${env.PORT}`

    const fileURL = new URL(`/uploads/${name}`, fullURL).toString()

    return fileURL
  }
}