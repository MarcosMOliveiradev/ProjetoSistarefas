import { Task } from '../../entites/tasks/task'
import { TaskRepository } from '../../repositories/tasks/task-repository'

interface ICreateTaskRequest {
  codigo: number
  setor: string
  descricao: string
  usuario: string
}

interface ICreateTaskResponse {
  task: Task
}

export class CreateTask {
  constructor(private taskRepository: TaskRepository) {
    Promise<void>
  }

  async execute(request: ICreateTaskRequest): Promise<ICreateTaskResponse> {
    const { codigo, setor, descricao, usuario } = request

    const task = new Task({
      codigo,
      setor,
      descricao,
      usuario,
    })

    await this.taskRepository.create(task)

    return { task }
  }
}
