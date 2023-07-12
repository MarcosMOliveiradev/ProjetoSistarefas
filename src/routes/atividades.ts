import { FastifyInstance } from 'fastify'

import { CreatedActivyController } from '../controllers/CreatedActivyController'
import { GetActivyController } from '../controllers/getActivy/GetActivyControllers'
import { GetActivyIdController } from '../controllers/getActivy/GetActivyIdControllers'
import { GetActivyForDateController } from '../controllers/getActivy/GetActivyForDateController'
import { GetActivyForIntervalDateControllers } from '../controllers/getActivy/GetActivyForIntervalDateControllers'
import { verify } from '../middlewares/jwtVerify'

const createdActivi = new CreatedActivyController()
const getActivi = new GetActivyController()
const getActiviId = new GetActivyIdController()
const getActiviDate = new GetActivyForDateController()
const getActivyIntervalDate = new GetActivyForIntervalDateControllers()

export async function atividades(app: FastifyInstance) {
  app.post('/', { preHandler: [verify] }, async (request, reply) => {
    return createdActivi.activy(request, reply)
  })

  app.get('/', { preHandler: [verify] }, async (request, reply) => {
    return getActivi.activyGet(request, reply)
  })

  app.get('/:id', { preHandler: [verify] }, async (request, reply) => {
    return getActiviId.getActivyForId(request, reply)
  })

  app.get('/data', { preHandler: [verify] }, async (request, reply) => {
    return getActiviDate.getActivyForDate(request, reply)
  })

  app.get('/intervalData', { preHandler: [verify] }, async (request, reply) => {
    return getActivyIntervalDate.getActivyIntevalDate(request, reply)
  })
}
