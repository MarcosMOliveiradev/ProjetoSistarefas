import { FastifyInstance } from 'fastify'

import { CreatedTascksControllers } from '../controllers/CreatedTascksControllers'
import { verify } from '../middlewares/jwtVerify'

const newTasck = new CreatedTascksControllers()

export async function tasck(app: FastifyInstance) {
  app.post('/', { preHandler: [verify] }, async (request, reply) => {
    newTasck.createdTascks(request, reply, app) // cria uma nova tasck
  })
}
