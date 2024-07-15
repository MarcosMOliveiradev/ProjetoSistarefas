import { FastifyReply, FastifyRequest } from 'fastify'
import { authenticate } from '../../../middlewares/UserAuthenticate'
import { makeListUser } from 'src/application/use-cases/users/factory/makeListUser'

export function listUser(request: FastifyRequest, reply: FastifyReply) {
  authenticate(request.user.permission)

  try {
    const makeUser = makeListUser()

    const user = makeUser.execute()

    return reply.status(201).send(user)
  } catch (err) {
    return reply.status(400).send({ message: err })
  }
}
