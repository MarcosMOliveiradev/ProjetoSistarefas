import { FastifyInstance } from 'fastify'

import { CreatedUserControlle } from '../controllers/CreatedUserController'
import { AuthenticateUserController } from '../controllers/authenticateUser/AuthenticateUserController'
import { GetUserController } from '../controllers/getUsers/getUserControllers'
import { verify } from '../middlewares/jwtVerify'
import { UpdateUser } from './../controllers/PutUserController'

const createdUser = new CreatedUserControlle()
const authenticate = new AuthenticateUserController()
const getUser = new GetUserController()
const updateUser = new UpdateUser()

export async function usuario(app: FastifyInstance) {
  app.post('/created', { preHandler: [verify] }, async (request, reply) => {
    return createdUser.user(request, reply, app)
  })

  app.post('/', async (request, reply) => {
    return authenticate.authentication(request, reply, app) // login
  })

  app.get('/', { preHandler: [verify] }, async (request, reply) => {
    return getUser.getUser(request, reply) // lista
  })

  app.put('/update', { preHandler: [verify] }, async (request, reply) => {
    return updateUser.updateUser(request, reply)
  })
}
