import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { makeTrocaVinculoUsuario } from "../../application/useCase/grupos/factories/make-troca-vinculo-usuario.ts"

export async function trocarVinculoUsuarioController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const encerraVinculoSchema = z.object({
    userId: z.string(),
    novoGrupoId: z.string(),
    dataInicio: z.coerce.date()
  })
  const { dataInicio, novoGrupoId, userId } = encerraVinculoSchema.parse(request.body)

  try {
    const encerrarVinculoUsuario = makeTrocaVinculoUsuario()
    await encerrarVinculoUsuario.execute({ userId, dataInicio, novoGrupoId })

    return reply.status(200).send({message: "Vinculo encerrado"})
  } catch (err) {
    return reply.status(400).send({
      message: err instanceof Error ? err.message : "Erro inesperado"
    })
  }
}