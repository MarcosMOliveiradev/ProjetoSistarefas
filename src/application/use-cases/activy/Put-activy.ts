import { ActivyRepository } from '../../repositories/activy/Activy-repository'
import { TaskRepository } from '../../repositories/tasks/task-repository'

interface IPutActivyRequest {
  _id: string
  user: string
  index?: number
  quantidadeFolhas?: string
  idDocumento?: string
  horaInicio?: string
  horaTermino?: string
  codigoTarefa?: number
  data?: string
}

export class PutActivy {
  constructor(
    private actvyRepository: ActivyRepository,
    private taskRepository: TaskRepository,
  ) {
    Promise<void>
  }

  async exec(request: IPutActivyRequest) {
    const {
      index,
      quantidadeFolhas,
      idDocumento,
      horaInicio,
      horaTermino,
      codigoTarefa,
      data,
      _id,
      user,
    } = request
    let task: string | undefined = ''

    if (codigoTarefa === undefined) {
      task = undefined
      const id = _id
      await this.actvyRepository.put(
        id,
        user,
        index,
        quantidadeFolhas,
        idDocumento,
        horaInicio,
        horaTermino,
        data,
        task,
      )
    }

    if (codigoTarefa !== undefined) {
      task = await this.taskRepository.id(codigoTarefa)
      if (task !== undefined) {
        const id = _id

        await this.actvyRepository.put(
          id,
          user,
          index,
          quantidadeFolhas,
          idDocumento,
          horaInicio,
          horaTermino,
          data,
          task,
        )
      }
    }
  }
}
