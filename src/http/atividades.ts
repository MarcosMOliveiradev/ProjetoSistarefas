import { FastifyInstance } from 'fastify'

import { CreatedActivyController } from './controllers/activy/CreatedActivyController'
import { GetActivyController } from './controllers/activy/GetActivyControllers'
import { GetActivyIdController } from './controllers/activy/GetActivyIdControllers'
import { GetActivyForDateController } from './controllers/activy/GetActivyForDateController'
import { GetActivyForIntervalDateControllers } from './controllers/activy/GetActivyForIntervalDateControllers'
import { PutActivy } from './controllers/activy/PutActivyControllers'
import { verify } from '../middlewares/jwtVerify'

const createdActivi = new CreatedActivyController()
const getActivi = new GetActivyController()
const getActiviId = new GetActivyIdController()
const getActiviDate = new GetActivyForDateController()
const getActivyIntervalDate = new GetActivyForIntervalDateControllers()
const putActivy = new PutActivy()

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

  app.put('/put', { preHandler: [verify] }, async (request, reply) => {
    return putActivy.putActivy(request, reply)
  })
}