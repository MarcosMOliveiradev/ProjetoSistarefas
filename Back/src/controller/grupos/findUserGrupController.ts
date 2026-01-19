import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFindUserGrup } from "../../application/useCase/grupos/factories/make-find-user-grup.ts";

export async function findUserGrupController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = z.object({
    id: z.string()
  })

  const userRole = request.user.role
  if(userRole !== 'INFORMATICA') {
    return reply.status(400).send({message: 'Você não tem permissão!'})
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