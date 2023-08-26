import { FastifyInstance } from 'fastify'

import { CreatedTascksControllers } from './controllers/tasks/CreatedTasksController'
import { verify } from '../middlewares/jwtVerify'
import { PrismaTaskRepository } from '../database/prisma/repositoris/prisma-task-repository'
import { CreateTask } from '../application/use-cases/tasks/create-task'
import { ListTask } from '../application/use-cases/tasks/List-task'
import { ListTasksController } from './controllers/tasks/ListTasksController'

const prismaTask = new PrismaTaskRepository()
const createTask = new CreateTask(prismaTask)
const newTasck = new CreatedTascksControllers(createTask)
const listTask = new ListTask(prismaTask)
const listTaskController = new ListTasksController(listTask)

export async function tasck(app: FastifyInstance) {
  app.post('/', { preHandler: [verify] }, async (request, reply) => {
    return newTasck.createdTascks(request, reply, app) // cria uma nova tasck
  })

  app.get('/', async (request) => {
    return listTaskController.list(request)
  })
}
