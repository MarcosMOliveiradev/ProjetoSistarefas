import { FastifyInstance } from 'fastify'

import { CreatedUserControlle } from './controllers/users/CreatedUserController'
import { GetUserController } from './controllers/users/getUserControllers'
import { UpdateUser } from './controllers/users/PutUserController'
import { verify } from '../middlewares/jwtVerify'
import { CreateUser } from '../application/use-cases/users/create-user'
import { PrismaUserRepository } from '../database/prisma/repositoris/prisma-notification-repository'
import { AuthenticateUserController } from '../application/authenticateUser/AuthenticateUserController'
// import { AuthenticateUser } from '../application/use-cases/users/authenticate-user'

const prismaUser = new PrismaUserRepository()
const createUserInstance = new CreateUser(prismaUser)
const createdUser = new CreatedUserControlle(createUserInstance)
const getUser = new GetUserController(prismaUser)
// const authenticate = new AuthenticateUser(prismaUser)

const authenticate = new AuthenticateUserController()
const updateUser = new UpdateUser()

export async function usuario(app: FastifyInstance) {
  app.post('/created', async (request, reply) => {
    return createdUser.user(request, reply, app)
  })

  app.post('/', async (request, reply) => {
    return authenticate.authentication(request, reply, app) // login
  })

  app.get('/', { preHandler: [verify] }, async (request, reply) => {
    return getUser.getUser(request) // lista
  })

  app.put('/update', { preHandler: [verify] }, async (request, reply) => {
    return updateUser.updateUser(request, reply)
  })
}
