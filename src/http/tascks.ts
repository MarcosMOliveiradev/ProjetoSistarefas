import { FastifyInstance } from 'fastify'

import { CreatedTascksControllers } from './controllers/tasks/CreatedTasksController'
import { verify } from '../middlewares/jwtVerify'
import { PrismaTaskRepository } from '../database/prisma/repositoris/prisma-task-repository'
import { CreateTask } from '../application/use-cases/tasks/create-task'

const prismaTask = new PrismaTaskRepository()
const createTask = new CreateTask(prismaTask)
const newTasck = new CreatedTascksControllers(createTask)

export async function tasck(app: FastifyInstance) {
  app.post('/', { preHandler: [verify] }, async (request, reply) => {
    return newTasck.createdTascks(request, reply, app) // cria uma nova tasck
  })
}
