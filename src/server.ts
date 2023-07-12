import fastify from 'fastify'
import jwt from '@fastify/jwt'
import { env } from './env'
import { atividades } from './routes/atividades'
import { usuario } from './routes/usuarios'
import { tasck } from './routes/tascks'

const app = fastify()
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
  })
  .then(() => {
    console.log(`HTTP Server running in http://localhost:${env.PORT}`)
  })
