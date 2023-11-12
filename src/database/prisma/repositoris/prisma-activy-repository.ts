import { Activy } from '../../../application/entites/activy/activy'
import { ActivyRepository } from '../../../application/repositories/activy/Activy-repository'
import { prisma } from '../../prisma'

export class PrismaActivyRepository extends ActivyRepository {
  async put(
    id: string,
    user: string,

    index: number | undefined,
    quantidadeFolhas: string | undefined,
    idDocumento: string | undefined,
    horaInicio: string | undefined,
    horaTermino: string | undefined,
    data: string | undefined,
    task: string | undefined,
  ): Promise<void> {
    await prisma.atividade.update({
      where: {
        id,
      },

      data: {
        index_atividade_tarefa: index,
        quantidade_de_folhas: quantidadeFolhas,
        id_documento: idDocumento,
        hora_inicio: horaInicio,
        hora_termino: horaTermino,
        tarefasId: task,
        data,
      },
    })
  }

  async listUserActivy(data: string, matricula: number): Promise<Activy> {
    const result = await prisma.atividade.findMany({
      where: {
        usuario: {
          matricula,
        },
        data: {
          equals: data,
        },
      },

      orderBy: {
        data: 'asc',
      },

      select: {
        index_atividade_tarefa: true,
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

    return result
  }

  async count(matricula: number): Promise<Activy> {
    const result = await prisma.atividade.findMany({
      where: {
        usuario: {
          matricula,
        },
      },
      select: {
        usuario: {
          select: {
            nome: true,
            matricula: true,
            permission: true,
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
    return result
  }

  async listIntervalDate(dataConsulta: string, use: string): Promise<Activy> {
    const datainfo = await prisma.atividade.findMany({
      where: {
        usuarioId: use,
        data: {
          contains: dataConsulta,
        },
      },

      orderBy: {
        data: 'asc',
      },

      select: {
        index_atividade_tarefa: true,
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
      return 'não foram encontradas nenhuma informação referente a esta data, verifque se a data esta correta!'
    }

    return datainfo
  }

  async listDate(data: string, user: string): Promise<Activy> {
    const activyListDate = await prisma.atividade.findMany({
      where: {
        usuarioId: user,
        data: {
          equals: data,
        },
      },

      orderBy: {
        index_atividade_tarefa: 'asc',
      },

      select: {
        id: true,
        index_atividade_tarefa: true,
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

    return activyListDate
  }

  async findMany(): Promise<Activy> {
    const activyList = await prisma.atividade.findMany({
      select: {
        index_atividade_tarefa: true,
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

    return activyList
  }

  async create(activy: Activy): Promise<void> {
    await prisma.atividade.create({
      data: {
        id: activy.id,
        data: activy.data,
        index_atividade_tarefa: activy.index_atividade_tarefa,
        tarefasId: activy.task,
        quantidade_de_folhas: activy.quantidade_de_folha,
        id_documento: activy.id_documento,
        hora_inicio: activy.hora_inicio,
        hora_termino: activy.hora_termino,
        created_at: activy.created,

        usuarioId: activy.usuario,
      },
    })
  }
}
