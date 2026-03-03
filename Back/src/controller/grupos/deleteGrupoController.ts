import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteGrupo } from "../../application/useCase/grupos/factories/make-delete-grupo.ts";

export async function deleteGrupoController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteGrupoSchema = z.object({
    id: z.string()
  })

  const userRole = request.user.role
  if(userRole !== "INFORMATICA") {
    return reply.status(400).send({message: 'Você não tem permissão'})
  }

  const { id } = deleteGrupoSchema.parse(request.params)

  try {
    const deleteGrupo = makeDeleteGrupo()
    await deleteGrupo.execute({id})

    return reply.status(200).send({message: 'Deletado!'})
  } catch (error) {
    return reply.status(400).send({message: error})
  }
}