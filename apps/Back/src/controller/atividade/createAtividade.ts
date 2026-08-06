import type { FastifyReply, FastifyRequest } from "fastify";
import type { Atividade } from "../../application/entities/Atividade.ts";
import z from "zod";
import { makeCreateAtividade } from "../../application/useCase/atividade/factories/make-create-atividade.ts";

export async function createAtividadeController(
  request: FastifyRequest,
  reply: FastifyReply 
): Promise<Atividade | any > {
  const atividadeSchema = z.object({
    cod_atividade: z.number(),
    setor: z.string(),
    descricao: z.string(),
    tempoMedio: z.number(),
    ativado: z.boolean().default(true)
  })
  const userId = request.user.sub

  const { cod_atividade, descricao, setor, tempoMedio, ativado } = atividadeSchema.parse(request.body)

  try {
    const createAtividade = makeCreateAtividade()
    const { atividade } = await createAtividade.exec({
      cod_atividade,
      descricao,
      setor,
      tempoMedio,
      ativado,
      
      userId
    })

    return reply.status(201).send({ atividade })
  } catch (err) {

    return reply.status(400)

  }
}