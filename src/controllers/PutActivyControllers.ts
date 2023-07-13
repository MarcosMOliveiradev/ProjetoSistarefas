import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { checkId } from '../middlewares/checkedIdTasck'
import { checkedIdActivy } from '../middlewares/CheckedIdActivy'

export class PutActivy {
  async putActivy(request: FastifyRequest, reply: FastifyReply) {
    const activySchema = z.object({
      indexBody: z.number(),
      idDocumento: z.string(),
      quantidadeFolhas: z.string(),
      horaInicio: z.string(),
      horaTermino: z.string(),
      codigoTarefa: z.number(),
      newData: z.string(),
    })

    const querySchema = z.object({
      codigo: z.string(),
      index: z.string(),
      data: z.string(),
    })

    const { data, index, codigo } = querySchema.parse(request.query)
    const indexNum = parseInt(index)
    const codigoNum = parseInt(codigo)

    // Verifica o id da tarefa no banco de dados
    const idTarefa = await checkId(codigoNum)

    // Verifica o id da atividade no banco de dados
    const idActivy = await checkedIdActivy(request, indexNum, idTarefa, data)

    const {
      indexBody,
      idDocumento,
      quantidadeFolhas,
      horaInicio,
      horaTermino,
      newData,
      codigoTarefa,
    } = activySchema.parse(request.body)

    const codigoId = await checkId(codigoTarefa)

    await prisma.atividade.update({
      where: {
        id: idActivy,
      },
      data: {
        index_atividade_arefa: indexBody,
        id_documento: idDocumento,
        quantidade_de_folhas: quantidadeFolhas,
        hora_inicio: horaInicio,
        hora_termino: horaTermino,
        data: newData,
        tarefasId: codigoId,
      },
    })
    return reply.status(201).send('Atualizado com sucesso')
  }
}
