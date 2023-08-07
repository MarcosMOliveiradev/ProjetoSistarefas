import { FastifyRequest } from 'fastify'
import { prisma } from '../database/prisma'

export async function checkedIdActivy(
  request: FastifyRequest,
  indexNum: number,
  idTarefa: string,
  data: string,
) {
  const verificaId = await prisma.atividade.findFirst({
    where: {
      usuarioId: request.user.sub,
      index_atividade_arefa: indexNum,
      tarefasId: idTarefa,
      data: {
        equals: data,
      },
    },
    select: {
      id: true,
    },
  })

  return verificaId?.id
}