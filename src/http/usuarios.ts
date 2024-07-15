import { FastifyInstance } from 'fastify'

import { CreatedUserController } from './controllers/users/CreatedUserController'
import { listUser } from './controllers/users/ListUserControllers'
import { UpdateUserControler } from './controllers/users/PutUserController'
import { UserAvata } from './controllers/users/UserAvata'
import { AuthenticateUserController } from './controllers/users/AuthenticateUserController'

import { verify } from '../middlewares/jwtVerify'
import { PrismaUserRepository } from '../database/prisma/repositoris/prisma-user-repository'
import { UpdateUser } from '../application/use-cases/users/update-user'

const prismaUser = new PrismaUserRepository()
const updateUser = new UpdateUser(prismaUser)
const userAvata = new UserAvata()

const updateUserControler = new UpdateUserControler(updateUser)

export async function usuario(app: FastifyInstance) {
  app.post('/created', async (request, reply) => {
    return CreatedUserController(request, reply)
  }) // criar

  app.post('/', { preHandler: [verify] }, async (request, reply) => {
    return AuthenticateUserController(request, reply, app) // login
  }) // autenticar

  app.get('/', { preHandler: [verify] }, async (request, reply) => {
    return listUser(request, reply) // lista
  }) // listar

  app.put('/update/:id', { preHandler: [verify] }, async (request, reply) => {
    return updateUserControler.put(request)
  })

  app.post('/upload', async (request, reply) => {
    return userAvata.upload(request, reply)
  })
}
