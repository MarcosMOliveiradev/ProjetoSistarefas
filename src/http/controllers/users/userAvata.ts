import { randomUUID } from 'node:crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { resolve, dirname, extname } from 'node:path'
import { createWriteStream } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'

const pump = promisify(pipeline)

export class UserAvata {
  async upload(request: FastifyRequest, reply: FastifyReply) {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const upload = await request.file({
      limits: {
        fileSize: 5_242_888, // 5mb
      },
    })

    if (!upload) {
      return reply.status(400).send()
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) {
      return reply.status(400).send()
    }

    const fileId = randomUUID()
    const extension = extname(upload.filename)

    const fileName = fileId.concat(extension)

    const writeSream = createWriteStream(
      resolve(__dirname, '../../../../upload', fileName),
    )

    await pump(upload.file, writeSream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)

    const fileUrl = new URL(`/upload/${fileName}`, fullUrl).toString()

    return { fileUrl }
  }
}
