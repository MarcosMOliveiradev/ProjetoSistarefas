import { FastifyRequest, FastifyReply } from 'fastify'
import { createWriteStream } from 'node:fs'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { env } from '../lib/env.ts'

const pump = promisify(pipeline)

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename)

export class MediaController {
    async uploadMedia(request: FastifyRequest, reply: FastifyReply) {
        const file = await request.file()

        if (!file) {
            throw new Error('No file uploaded')
        }

        let random
        for(var i = 0; i < 6; i++) {
            i == 0 ? random = Math.floor(Math.random() * 10).toString()
            : random += Math.floor(Math.random() * 10).toString()
        }

        const fullName = file.filename
        const newFileName = fullName.replace(/\s/g, '')
        const name = `${random}-${newFileName}`

        const writeStream = createWriteStream(
            resolve(__dirname, '../../../uploads/', name)
        )

        await pump(file.file, writeStream)

        const fullURL = request.protocol.concat('://').concat(request.hostname).concat(`:${env.PORT}`)

        const fileURL = new URL(`/uploads/${name}`, fullURL).toString()

        return fileURL
    }
}