import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { feedbackOptions } from "../../application/entities/Feedback.ts";
import { makeCreateFeedback } from "../../application/useCase/feedback/factoris/makeCreateFeedback.ts";

export async function createFeedback(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const feedbackSchema = z.object({
    conteudo: z.string(),
    status: z.enum(feedbackOptions).default(feedbackOptions.ANALIZANDO),
    nome: z.string().optional(),
  })

  const { conteudo, status, nome } = feedbackSchema.parse(request.body)

  try {
    const createFeedback = makeCreateFeedback()
    await createFeedback.execute({conteudo, nome, statusBody:status })

    return reply.status(201).send({message: "Feedback criado com sucesso"})
    
  } catch (err) {
    return reply.status(404).send({message: "Erro ao criar o feedback"})
  }
}