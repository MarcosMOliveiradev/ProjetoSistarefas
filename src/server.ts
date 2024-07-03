import fastify from 'fastify'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'
import { env } from './env'
import { atividades } from './http/atividades'
import { usuario } from './http/usuarios'
import { tasck } from './http/tascks'
import { resolve } from 'node:path'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = fastify()

app.register(multipart)

app.register(fastifyStatic, {
  root: resolve(__dirname, '../upload'),
  prefix: '/upload',
})

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'testedeautehtication',
})

app.register(usuario, {
  prefix: '/usuario',
})

app.register(atividades, {
  prefix: '/atividade',
})

app.register(tasck, {
  prefix: '/tasck',
})

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`HTTP Server running in http://localhost:${env.PORT}`)
  })
