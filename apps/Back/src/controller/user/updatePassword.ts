import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeupdatePassword } from "../../application/useCase/user/factories/make-updatePassword.ts";

export async function updatePasswordController(
  request: FastifyRequest,
  reply: FastifyReply 
) {
  const updatePasswordSchema = z.object({
    senha: z.string()
  })

  const { senha } = updatePasswordSchema.parse(request.body)

  const id = request.user.sub

  try {
    const updatePassword = makeupdatePassword()
    await updatePassword.execute({ id, senha })

    return reply.status(200).send({message: "Senha atualizada com sucesso."})
    
  } catch (err) {
    reply.status(404).send({message: "Erro ao atualizar a senha."})
  }
}