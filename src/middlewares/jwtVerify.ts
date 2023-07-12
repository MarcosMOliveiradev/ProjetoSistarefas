import { FastifyRequest } from 'fastify'

export async function verify(request: FastifyRequest) {
  await request.jwtVerify()
}
