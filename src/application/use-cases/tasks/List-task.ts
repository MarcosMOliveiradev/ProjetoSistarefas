import { TaskRepository } from '../../repositories/tasks/task-repository'

export class ListTask {
  constructor(private taskRepository: TaskRepository) {
    Promise<void>
  }

  async List() {
    const tasks = this.taskRepository.findMany()
    return tasks
  }
}
