import { FastifyReply, FastifyRequest } from "fastify"

export async function signOutController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  reply.clearCookie('refreshToken', {
    path: '/',
  })

  return reply.status(200).send({
    message: 'Logout realizado',
  })
}