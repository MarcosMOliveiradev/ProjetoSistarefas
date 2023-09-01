import { FastifyInstance } from 'fastify'

import { CreatedActivyController } from './controllers/activy/CreatedActivyController'
import { GetActivyController } from './controllers/activy/GetActivyControllers'
import { GetActivyIdController } from './controllers/activy/GetActivyIdControllers'
import { GetActivyForDateController } from './controllers/activy/GetActivyForDateController'
import { GetActivyForIntervalDateControllers } from './controllers/activy/GetActivyForIntervalDateControllers'
import { PutActivy } from './controllers/activy/PutActivyControllers'
import { verify } from '../middlewares/jwtVerify'
import { CreatedActivy } from '../application/use-cases/activy/Create-activy'
import { PrismaTaskRepository } from '../database/prisma/repositoris/prisma-task-repository'
import { PrismaActivyRepository } from '../database/prisma/repositoris/prisma-activy-repository'
import { ListActivy } from '../application/use-cases/activy/List-activy'
import { ListActivyForDate } from '../application/use-cases/activy/List-activy-for-date'

// repository
const taskRepository = new PrismaTaskRepository()
const activyRepository = new PrismaActivyRepository()

// aplication
const createActivy = new CreatedActivy(activyRepository)
// controller
const createdActivi = new CreatedActivyController(createActivy, taskRepository)
const activyList = new ListActivy(activyRepository)
const getActivi = new GetActivyController(activyList)
const getActiviId = new GetActivyIdController()
const listActivyDate = new ListActivyForDate(activyRepository)
const getActiviDate = new GetActivyForDateController(listActivyDate)
const getActivyIntervalDate = new GetActivyForIntervalDateControllers()
const putActivy = new PutActivy()

export async function atividades(app: FastifyInstance) {
  app.post('/', { preHandler: [verify] }, async (request, reply) => {
    return createdActivi.activy(request, reply)
  })

  app.get('/', { preHandler: [verify] }, async (request, reply) => {
    return getActivi.activyGet()
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
