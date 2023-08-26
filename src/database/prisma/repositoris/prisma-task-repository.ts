import { Task } from '../../../application/entites/tasks/task'
import { TaskRepository } from '../../../application/repositories/tasks/task-repository'
import { prisma } from '../../prisma'

export class PrismaTaskRepository extends TaskRepository {
  async create(task: Task): Promise<void> {
    await prisma.tarefas.create({
      data: {
        id: task.id,
        codigo: task.codigo,
        setor: task.setor,
        descricao: task.descricao,
        created_at: task.created,

        usuarioId: task.user,
      },
    })
  }
}
