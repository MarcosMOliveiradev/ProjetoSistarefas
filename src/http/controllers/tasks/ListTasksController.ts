import { FastifyRequest } from 'fastify'
import { ListTask } from '../../../application/use-cases/tasks/List-task'

export class ListTasksController {
  constructor(private listTask: ListTask) {
    Promise<void>
  }

  async list(request: FastifyRequest) {
    return this.listTask.List()
  }
}
