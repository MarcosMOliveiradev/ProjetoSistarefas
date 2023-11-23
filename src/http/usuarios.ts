import { FastifyInstance } from 'fastify'

import { CreatedUserControlle } from './controllers/users/CreatedUserController'
import { GetUserController } from './controllers/users/getUserControllers'
import { UpdateUserControler } from './controllers/users/PutUserController'
import { verify } from '../middlewares/jwtVerify'
import { CreateUser } from '../application/use-cases/users/create-user'
import { PrismaUserRepository } from '../database/prisma/repositoris/prisma-user-repository'
import { AuthenticateUserController } from './controllers/users/AuthenticateUserController'
import { AuthenticateUser } from '../application/use-cases/users/authenticate-user'
import { UpdateUser } from '../application/use-cases/users/update-user'
import { UserAvata } from './controllers/users/userAvata'

const prismaUser = new PrismaUserRepository()
const createUserInstance = new CreateUser(prismaUser)
const createdUser = new CreatedUserControlle(createUserInstance)
const getUser = new GetUserController(prismaUser)
const updateUser = new UpdateUser(prismaUser)
const authenticateUser = new AuthenticateUser(prismaUser)
const userAvata = new UserAvata()

const authenticate = new AuthenticateUserController(authenticateUser)
const updateUserControler = new UpdateUserControler(updateUser)

export async function usuario(app: FastifyInstance) {
  app.post('/created', { preHandler: [verify] }, async (request, reply) => {
    return createdUser.user(request)
  }) // criar

  app.post('/', async (request, reply) => {
    return authenticate.authentication(request, reply, app) // login
  }) // autenticar

  app.get('/', { preHandler: [verify] }, async (request, reply) => {
    return getUser.getUser(request) // lista
  }) // listar

  app.put('/update/:id', { preHandler: [verify] }, async (request, reply) => {
    return updateUserControler.put(request)
  })

  app.post('/upload', async (request, reply) => {
    return userAvata.upload(request, reply)
  })
}
