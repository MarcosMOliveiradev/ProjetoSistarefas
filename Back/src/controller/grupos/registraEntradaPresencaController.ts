import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegistraEntradaPresenca } from "../../application/useCase/grupos/factories/make-registra-entrada-presenca.ts";

export async function registraEntradaPresencaController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const entradaSchema = z.object({
    presencaId: z.string(),
    userId: z.string(),
    horaEntrada: z.string()
  })

  const { horaEntrada, presencaId, userId } = entradaSchema.parse(request.body)

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