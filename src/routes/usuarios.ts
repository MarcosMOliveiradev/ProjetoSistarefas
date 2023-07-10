import { FastifyInstance } from 'fastify'
import { CreatedUserControlle } from '../controllers/CreatedUserControlle'
import { AuthenticateUserController } from '../controllers/authenticateUser/AuthenticateUserController'

const createdUser = new CreatedUserControlle()
const authenticate = new AuthenticateUserController()

export async function usuario(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    return createdUser.user(request, reply, app)
  })

  app.post('/login', async (request, reply) => {
    return authenticate.authentication(request, reply, app)
  })
}
