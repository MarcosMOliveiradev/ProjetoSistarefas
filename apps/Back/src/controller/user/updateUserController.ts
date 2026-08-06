import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateUser } from "../../application/useCase/user/factories/make-update-user.ts";
import { getUser } from "../../application/useCase/user/function/user.ts";

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

  const userId = request.user.sub
  const userRole = await getUser(userId)

  if(!userRole || 'message' in userRole) {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }
  if(userRole.user_roles.role !== 'INFORMATICA') {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }

  const { id, name, password, ativado } = updateUserSchema.parse(request.body)

  try {
    const updateUser = makeUpdateUser()
    await updateUser.execute({ id, ativado, name, senha: password })

    return reply.status(200).send({ message: 'Usuario atualizado' })
  } catch (err) {
    return reply.status(404).send({message: err})
  }
}