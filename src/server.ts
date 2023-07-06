import fastify from 'fastify'
import { env } from './env'
import { atividades } from './routes/atividades'
import { usuario } from './routes/usuarios'

const app = fastify()

app.register(atividades, {
  prefix: '/atividade',
})

app.register(usuario, {
  prefix: '/usuario',
})
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP Server running in http://localhost:${env.PORT}`)
  })
