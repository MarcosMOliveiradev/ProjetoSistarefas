import { Activy } from '../../../application/entites/activy/activy'
import { ActivyRepository } from '../../../application/repositories/activy/Activy-repository'
import { prisma } from '../../prisma'

export class PrismaActivyRepository extends ActivyRepository {
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
