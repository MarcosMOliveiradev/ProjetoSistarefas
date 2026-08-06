import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UnexisteFeedback } from "../../application/useCase/feedback/error/unexistFeedback.ts";
import { makeListFeedback } from "../../application/useCase/feedback/factoris/makelistFeedback.ts";

export async function listFeedbackController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listFeedbackSchema = z.object({
    id: z.string()
  })

  const { id } = listFeedbackSchema.parse(request.params)

  try {
    const listFeedback = makeListFeedback()
    const feedback = await listFeedback.execute({id})

    return feedback
    
  } catch (err) {
    if(err instanceof UnexisteFeedback) {
      return reply.status(400).send(err.message)
    }

    return reply.status(500).send(`message: ${err}`)
  }
}