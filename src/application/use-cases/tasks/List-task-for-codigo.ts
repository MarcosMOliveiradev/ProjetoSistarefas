import { TaskRepository } from '../../repositories/tasks/task-repository'
interface IListTaskCodigo {
  codigo: number
}
export class ListTaskForCodigo {
  constructor(private taskRepository: TaskRepository) {
    Promise<void>
  }

  async execute(request: IListTaskCodigo) {
    const { codigo } = request

    return await this.taskRepository.findForId(codigo)
  }
}
