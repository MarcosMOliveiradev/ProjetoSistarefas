import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeEncerraVinculoUsuario } from "../../application/useCase/grupos/factories/make-encerra-vinculo-usuario.ts";

export async function encerraVinculoUsuarioController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const encerraVinculoSchema = z.object({
    userId: z.string(),
    dataFim: z.coerce.date()
  })
  const { dataFim, userId } = encerraVinculoSchema.parse(request.body)

  try {
    const encerrarVinculoUsuario = makeEncerraVinculoUsuario()
    await encerrarVinculoUsuario.execute({ userId, dataFim })

    return reply.status(200).send({message: "Vinculo encerrado"})
  } catch (err) {
    return reply.status(400).send({
      message: err instanceof Error ? err.message : "Erro inesperado"
    })
  }
}