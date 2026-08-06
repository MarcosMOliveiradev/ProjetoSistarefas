import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCheckUserRole } from "../../application/useCase/user/factories/make-check-user-role.ts";
import { makeUpdateGrup } from "../../application/useCase/grupos/factories/make-update-grup.ts";

export async function updateGrupController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateGrupSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    diasEmpresa: z.array(z.number()).optional(),
    diasInstituicao: z.array(z.number()).optional(),
    dataFim: z.date().optional()
  })

  const userId = request.user.sub
  const isInformatica = await makeCheckUserRole(userId)

  if(!isInformatica) {
    return reply.status(400).send({message: 'Você não tem permissão'})
  }

  const { id, name, diasEmpresa, diasInstituicao, dataFim } = updateGrupSchema.parse(request.body)

  try {

    const updateGrupo = makeUpdateGrup()
    const grupo = await updateGrupo.execute({ id, name, diasEmpresa, diasInstituicao, dataFim })
    return reply.status(200).send(grupo)

  } catch (error) {

    return reply.status(400).send({message: error})

  }
}