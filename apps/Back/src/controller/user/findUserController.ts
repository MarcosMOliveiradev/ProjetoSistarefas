import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFindUser } from "../../application/useCase/user/factories/make-find-user.ts";
import { getUser } from "../../application/useCase/user/function/user.ts";

export async function findUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.user.sub
  const userRole = await getUser(userId)

  if(!userRole || 'message' in userRole) {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }
  if(userRole.user_roles.role !== 'INFORMATICA') {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }

  try {
    const findUser = makeFindUser()
    const users = await findUser.execute()

    return reply.status(200).send(users)
  } catch (err) {
    return reply.status(400).send({ message: 'Erro ao buscar usuários' })
  }
}