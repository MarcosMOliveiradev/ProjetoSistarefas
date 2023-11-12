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

    if (codigoTarefa === undefined) {
      throw new Error('Erro no codigo de atividade')
    }

    const task = await this.taskRepository.id(codigoTarefa)

    const id = _id

    console.log(
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
