import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateGrupo } from "../../application/useCase/grupos/factories/make-create-grupos.ts";

export async function createGruposCroller(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createGrupoSchema = z.object({
    nome: z.string(),

    diasEmpresa: z
      .array(z.number().int().min(0).max(6))
      .optional()
      .default([]),

    diasInstituicao: z
      .array(z.number().int().min(0).max(6))
      .optional()
      .default([]),

    dataInicio: z.coerce.date(),
    dataFim: z.coerce.date().optional(),
  })

  const {
    nome,
    diasEmpresa,
    diasInstituicao,
    dataInicio,
    dataFim,
  } = createGrupoSchema.parse(request.body)

  try {
    const createGrupo = makeCreateGrupo()

    await createGrupo.execute({
      nome,
      diasEmpresa,
      diasInstituicao,
      dataInicio,
      dataFim,
    })

    return reply.status(201).send({
      message: "Criado com sucesso!",
    })
  } catch (err) {
    return reply.status(400).send({
      message:
        err instanceof Error ? err.message : "Erro ao criar grupo",
    })
  }
}