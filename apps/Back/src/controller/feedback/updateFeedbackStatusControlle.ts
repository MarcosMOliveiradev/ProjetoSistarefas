import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { feedbackOptions } from "../../application/entities/Feedback.ts";
import { makeUpdateFeedbackStatus } from "../../application/useCase/feedback/factoris/makeUpdateFeedbakStatus.ts";
import { getUser } from "../../application/useCase/user/function/user.ts";

export async function updateFeedbackStatusController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateFeedbackStatusSchema = z.object({
    id: z.string(),
    status: z.enum(feedbackOptions)
  })
  const { status, id } = updateFeedbackStatusSchema.parse(request.body)
  
  const userId = request.user.sub
  const userRole = await getUser(userId)

  if(!userRole || 'message' in userRole) {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }
  if(userRole.user_roles.role !== 'INFORMATICA') {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }

  try {
    const updateFeedbackStatus = makeUpdateFeedbackStatus()
    await updateFeedbackStatus.execute({ id, status })

    return reply.status(200).send({message: "Status atualizado!"})
    
  } catch (err) {
    return reply.status(400).send({message: `${err}`})
  }
}