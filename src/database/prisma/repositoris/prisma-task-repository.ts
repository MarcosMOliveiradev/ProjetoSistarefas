import { Task } from '../../../application/entites/tasks/task'
import { TaskRepository } from '../../../application/repositories/tasks/task-repository'
import { prisma } from '../../prisma'

export class PrismaTaskRepository extends TaskRepository {
  async findForId(codigo: number): Promise<Task> {
    const Codigo = await prisma.tarefas.findMany({
      where: {
        codigo,
      },
      select: {
        setor: true,
        descricao: true,
      },
    })

    return Codigo
  }

  async id(codigoTarefa: number | undefined): Promise<string | undefined> {
    const taskId = await prisma.tarefas.findUnique({
      where: {
        codigo: codigoTarefa,
      },
      select: {
        id: true,
      },
    })

    return taskId?.id || ''
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
