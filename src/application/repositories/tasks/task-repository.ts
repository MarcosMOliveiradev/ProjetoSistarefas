import { Task } from '../../entites/tasks/task'

export abstract class TaskRepository {
  abstract create(task: Task): Promise<void>
  abstract findMany(): Promise<Task>
  abstract findForId(codigo: number): Promise<Task>
  abstract id(codigoTarefa: number | undefined): Promise<string | undefined>
}
