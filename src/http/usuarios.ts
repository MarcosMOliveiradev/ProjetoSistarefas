import { FastifyInstance } from 'fastify'

import { CreatedUserController } from './controllers/users/CreatedUserController'
import { listUser } from './controllers/users/ListUserControllers'
import { UpdateUserControler } from './controllers/users/PutUserController'
import { UserAvata } from './controllers/users/UserAvata'
import { AuthenticateUserController } from './controllers/users/AuthenticateUserController'

import { verify } from '../middlewares/jwtVerify'
import { profileControlle } from './controllers/users/ProfileController'

const userAvata = new UserAvata()

export async function usuario(app: FastifyInstance) {
  app.post('/created', { preHandler: [verify] }, async (request, reply) => {
    return CreatedUserController(request, reply)
  }) // criar

  app.post('/', async (request, reply) => {
    return AuthenticateUserController(request, reply, app) // login
  }) // autenticar

  app.get('/', { preHandler: [verify] }, async (request, reply) => {
    return listUser(request, reply) // lista
  }) // listar

  app.put('/update/:id', { preHandler: [verify] }, async (request, reply) => {
    return UpdateUserControler(request, reply)
  })

  app.get('/profile', { preHandler: [verify]}, async (request, reply) => {
    return profileControlle(request, reply)
  })

  app.post('/upload', async (request, reply) => {
    return userAvata.upload(request, reply)
  })
}
