import { FastifyInstance } from 'fastify'

// data base
import { PrismaTaskRepository } from '../database/prisma/repositoris/prisma-task-repository'
import { PrismaActivyRepository } from '../database/prisma/repositoris/prisma-activy-repository'

// application
import { GetActivyIdController } from './controllers/activy/GetActivyIdControllers'
import { CreatedActivy } from '../application/use-cases/activy/Create-activy'
import { ListActivy } from '../application/use-cases/activy/List-activy'
import { ListActivyForDate } from '../application/use-cases/activy/List-activy-for-date'
import { ListActivyForIntervalDate } from '../application/use-cases/activy/List-activy-for-interval-date'
import { ListActivyForDateEndUser } from '../application/use-cases/activy/List-activy-for-date-end-user'
import { Cout } from '../application/use-cases/activy/Cout-activy'

// middlewares
import { verify } from '../middlewares/jwtVerify'

// controller
import { CreatedActivyController } from './controllers/activy/CreatedActivyController'
import { GetActivyController } from './controllers/activy/GetActivyControllers'
import { GetActivyForDateController } from './controllers/activy/GetActivyForDateController'
import { GetActivyForIntervalDateControllers } from './controllers/activy/GetActivyForIntervalDateControllers'
import { PutActivyControllers } from './controllers/activy/PutActivyControllers'
import { CoutActivyController } from './controllers/activy/CoutActivyController'
import { GetActivyForDateEndUserController } from './controllers/activy/GetActivyForDateEndUserController'
import { PutActivy } from '../application/use-cases/activy/Put-activy'
import { TimeActivy } from '../application/use-cases/activy/Time-activy'
import { TimeActivyController } from './controllers/activy/TimeActivyController'

// repository
const taskRepository = new PrismaTaskRepository()
const activyRepository = new PrismaActivyRepository()

// aplication
const createActivy = new CreatedActivy(activyRepository, taskRepository)
const coutActivy = new Cout(activyRepository)
const activyList = new ListActivy(activyRepository)
const listActivyDate = new ListActivyForDate(activyRepository)
const listAcityForIntervalDate = new ListActivyForIntervalDate(activyRepository)
const listActivyForDateEndUser = new ListActivyForDateEndUser(activyRepository)
const putActivy = new PutActivy(activyRepository, taskRepository)
const timeActivy = new TimeActivy(activyRepository)
// controller
const createdActivi = new CreatedActivyController(createActivy)
const getActivi = new GetActivyController(activyList)
const getActiviId = new GetActivyIdController()
const getActiviDate = new GetActivyForDateController(listActivyDate)
const getActivyIntervalDate = new GetActivyForIntervalDateControllers(
  listAcityForIntervalDate,
)
const putActivyController = new PutActivyControllers(putActivy)
const coutActivyController = new CoutActivyController(coutActivy)
const getActivyForDateEndUser = new GetActivyForDateEndUserController(
  listActivyForDateEndUser,
)
const timeActivyController = new TimeActivyController(timeActivy)

export async function atividades(app: FastifyInstance) {
  app.post('/', { preHandler: [verify] }, async (request, reply) => {
    return createdActivi.activy(request, reply)
  })

  app.get('/', async () => {
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

  app.get('/dataEndUser', { preHandler: [verify] }, async (request, reply) => {
    return getActivyForDateEndUser.getActivyForDate(request, reply)
  })

  app.put('/put/:id', { preHandler: [verify] }, async (request, reply) => {
    return putActivyController.exec(request, reply)
  })

  app.get('/cout', { preHandler: [verify] }, async (request, reply) => {
    return coutActivyController.execute(request, reply)
  })

  app.get('/timeCout', { preHandler: [verify] }, async (request, reply) => {
    return timeActivyController.coutTime(request, reply)
  })
}
