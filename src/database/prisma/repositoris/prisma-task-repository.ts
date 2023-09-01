import { Task } from '../../../application/entites/tasks/task'
import { TaskRepository } from '../../../application/repositories/tasks/task-repository'
import { prisma } from '../../prisma'

export class PrismaTaskRepository extends TaskRepository {
  async id(codigoTarefa: number): Promise<string> {
    const taskId = await prisma.tarefas.findUnique({
      where: {
        codigo: codigoTarefa,
      },
      select: {
        id: true,
      },
    })

    if (taskId?.id == null) {
      throw new Error('Codigo de tarefa invalida!')
    }

    return taskId.id
  }

  async findMany(): Promise<Task> {
    const tasks = await prisma.tarefas.findMany({
      select: {
        codigo: true,
        setor: true,
        descricao: true,

        usuario: {
          select: {
            nome: true,
            matricula: true,
          },
        },
      },
    })
    return tasks
  }

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
