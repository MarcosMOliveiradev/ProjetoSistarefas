import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFindUser } from "../../application/useCase/user/factories/make-find-user.ts";

export async function findUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userRole = request.user.role
  if(userRole !== 'INFORMATICA') {
    return reply.status(403).send({ message: 'Acesso negado' })
  }

  try {
    const findUser = makeFindUser()
    const users = await findUser.execute()

    return reply.status(200).send(users)
  } catch (err) {
    return reply.status(400).send({ message: 'Erro ao buscar usuários' })
  }
}