import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFindUserGrup } from "../../application/useCase/grupos/factories/make-find-user-grup.ts";
import { getUser } from "../../application/useCase/user/function/user.ts";

export async function findUserGrupController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = z.object({
    id: z.string()
  })

  const user = request.user.sub
  const userRole = await getUser(user)

  if(!userRole || 'message' in userRole) {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }
  if(userRole.user_roles.role !== 'INFORMATICA') {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }

  const { id } = userId.parse(request.params)

  try {

    const findUserGrupo = makeFindUserGrup()
    const grupo = await findUserGrupo.execute(id)

    return reply.status(200).send(grupo)

  } catch (err) {
    return reply.status(404).send({message: err})
  }
}