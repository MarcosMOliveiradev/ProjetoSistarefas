import { FastifyInstance } from 'fastify'

import { CreatedActivyController } from '../controllers/CreatedActivyController'
import { GetActivyController } from '../controllers/getActivy/GetActivyControllers'
import { GetActivyIdController } from '../controllers/getActivy/GetActivyIdControllers'
import { GetActivyForDateController } from '../controllers/getActivy/GetActivyForDateController'
import { GetActivyForIntervalDateControllers } from '../controllers/getActivy/GetActivyForIntervalDateControllers'

const createdActivi = new CreatedActivyController()
const getActivi = new GetActivyController()
const getActiviId = new GetActivyIdController()
const getActiviDate = new GetActivyForDateController()
const getActivyIntervalDate = new GetActivyForIntervalDateControllers()

export async function atividades(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    return createdActivi.activy(request, reply)
  })

  app.get('/', async (request, reply) => {
    return getActivi.activyGet(request, reply)
  })

  app.get('/:id', async (request, reply) => {
    return getActiviId.getActivyForId(request, reply)
  })

  app.get('/data', async (request, reply) => {
    return getActiviDate.getActivyForDate(request, reply)
  })

  app.get('/intervalData', async (request, reply) => {
    return getActivyIntervalDate.getActivyIntevalDate(request, reply)
  })
}
