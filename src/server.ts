import fastify from 'fastify'
import { env } from './env'

const app = fastify()

app.get('/', () => {
  const hello = 'hello word'

  return hello
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP Server running in http://localhost:${env.PORT}`)
  })
