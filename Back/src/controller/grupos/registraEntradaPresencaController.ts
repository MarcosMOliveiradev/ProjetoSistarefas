import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegistraEntradaPresenca } from "../../application/useCase/grupos/factories/make-registra-entrada-presenca.ts";

export async function registraEntradaPresencaController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const entradaSchema = z.object({
    presencaId: z.string(),
    horaEntrada: z.string()
  })

  const { horaEntrada, presencaId } = entradaSchema.parse(request.body)
  const userId = request.user.sub

  try {
    const entradaPresenca = makeRegistraEntradaPresenca()
    await entradaPresenca.execute({ horaEntrada, presencaId, userId })

    return reply.status(201).send({message: "Presenca registrada!"})
  } catch (err) {
    return reply.status(400).send({
      message: err instanceof Error ? err.message : "Erro inesperado"
    })
  }
}