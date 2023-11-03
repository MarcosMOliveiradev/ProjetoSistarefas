import fastify from 'fastify'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'
import { env } from './env'
import { atividades } from './http/atividades'
import { usuario } from './http/usuarios'
import { tasck } from './http/tascks'
import os from 'node:os'

const app = fastify()
// Pega o ip local
const networkAdress = os.networkInterfaces()
const ip = networkAdress.Ethernet[0].address

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
    console.log(`HTTP Server running in ${ip}:${env.PORT}`)
  })
