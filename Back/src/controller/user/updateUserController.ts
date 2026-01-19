import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateUser } from "../../application/useCase/user/factories/make-update-user.ts";

export async function updateUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateUserSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    password: z.string().optional(),
    ativado: z.boolean().optional()
  })

  const userRole = request.user.role

  if(userRole !== 'INFORMATICA') {
    return reply.status(404).send({message: 'Você não tem permissão para essa função!'})
  }

  const { id, name, password, ativado } = updateUserSchema.parse(request.body)

  try {
    const updateUser = makeUpdateUser()
    await updateUser.execute({ id, ativado, name, password })

    return reply.status(200).send({ message: 'Usuario atualizado' })
  } catch (err) {
    return reply.status(404).send({message: err})
  }
}