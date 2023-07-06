import { FastifyInstance } from 'fastify'
import { CreatedUserControle } from '../controllers/CreatedUserControle'

export async function usuario(app: FastifyInstance) {
  app.post('/', new CreatedUserControle().user)
}
