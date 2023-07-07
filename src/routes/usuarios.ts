import { FastifyInstance } from 'fastify'
import { CreatedUserControlle } from '../controllers/CreatedUserControlle'

export async function usuario(app: FastifyInstance) {
  app.post('/', new CreatedUserControlle().user)
}
