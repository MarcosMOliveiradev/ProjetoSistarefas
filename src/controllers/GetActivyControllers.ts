import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export class GetActivyController {
  // get all ************
  async activyGet(request: FastifyRequest, reply: FastifyReply) {
    const activyGet = await prisma.atividade.findMany({
      select: {
        id_documento: true,
        quantidade_de_folhas: true,
        hora_inicio: true,
        hora_termino: true,
        data: true,

        usuario: {
          select: {
            nome: true,
            matricula: true,
          },
        },

        Tarefas: {
          select: {
            codigo: true,
            setor: true,
            descricao: true,
          },
        },
      },
    })

    return reply.status(201).send(activyGet)
  }

  // get for id *********
  async getActivyForId(request: FastifyRequest, reply: FastifyReply) {
    const getActivyForIdSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getActivyForIdSchema.parse(request.params)

    const idNotExist = await prisma.atividade.findUnique({
      where: {
        id,
      },
    })

    if (!idNotExist) {
      throw new Error('⚠ Id não existente')
    }

    const activyForId = await prisma.atividade.findUnique({
      where: {
        id,
      },
      select: {
        id_documento: true,
        quantidade_de_folhas: true,
        hora_inicio: true,
        hora_termino: true,
        data: true,

        usuario: {
          select: {
            nome: true,
            matricula: true,
          },
        },

        Tarefas: {
          select: {
            codigo: true,
            setor: true,
            descricao: true,
          },
        },
      },
    })

    return reply.status(201).send(activyForId)
  }

  // get for date *********
  async getActivyForDate(request: FastifyRequest, reply: FastifyReply) {
    const dataSchema = z.object({
      data: z.string(),
    })

    const { data } = dataSchema.parse(request.query)

    if (!data) {
      return reply.status(400).send('O campo "data" é obrigatório')
    }

    const datainfo = await prisma.atividade.findMany({
      where: {
        data: {
          equals: data,
        },
      },
      select: {
        id_documento: true,
        quantidade_de_folhas: true,
        hora_inicio: true,
        hora_termino: true,
        data: true,

        usuario: {
          select: {
            nome: true,
            matricula: true,
          },
        },

        Tarefas: {
          select: {
            codigo: true,
            setor: true,
            descricao: true,
          },
        },
      },
    })

    if (datainfo.length === 0) {
      return reply
        .status(400)
        .send(
          'não foram encontradas nenhuma informação referente a esta data, verifque se a data esta correta!',
        )
    }

    return reply.send(datainfo)
  }

  // get for interval data **********
  async getActivyIntevalDate(request: FastifyRequest, reply: FastifyReply) {
    const dataSchema = z.object({
      dataInicio: z.string(),
      dataFim: z.string(),
    })

    const { dataInicio, dataFim } = dataSchema.parse(request.query)

    if (!dataInicio || !dataFim) {
      return reply.status(400).send('O campo "data" é obrigatório')
    }

    const datainfo = await prisma.atividade.findMany({
      where: {
        data: {
          gte: dataInicio,
          lte: dataFim,
        },
      },
      select: {
        id_documento: true,
        quantidade_de_folhas: true,
        hora_inicio: true,
        hora_termino: true,
        data: true,

        usuario: {
          select: {
            nome: true,
            matricula: true,
          },
        },

        Tarefas: {
          select: {
            codigo: true,
            setor: true,
            descricao: true,
          },
        },
      },
    })

    if (datainfo.length === 0) {
      return reply
        .status(400)
        .send(
          'não foram encontradas nenhuma informação referente a esta data, verifque se a data esta correta!',
        )
    }

    return reply.send(datainfo)
  }
}
