import { Task } from '../../entites/tasks/task'

export abstract class TaskRepository {
  abstract create(task: Task): Promise<void>
}
