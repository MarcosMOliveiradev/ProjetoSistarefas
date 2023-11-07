import { Activy } from '../../entites/activy/activy'
import { ActivyRepository } from '../../repositories/activy/Activy-repository'
import { TaskRepository } from '../../repositories/tasks/task-repository'

interface IActivyRequest {
  index_atividade_tarefa: number
  id_documento?: string
  quantidade_de_folha?: string
  hora_inicio: string
  hora_termino: string
  data: string

  usuario: string
  codigo: number
}

interface iActivyReturn {
  activy: Activy
}

export class CreatedActivy {
  constructor(
    private activyRepository: ActivyRepository,
    private taskRepository: TaskRepository,
  ) {
    Promise<void>
  }

  async create(request: IActivyRequest): Promise<iActivyReturn> {
    const {
      index_atividade_tarefa,
      id_documento,
      quantidade_de_folha,
      hora_inicio,
      hora_termino,
      data,
      usuario,
      codigo,
    } = request

    const task = await this.taskRepository.id(codigo)

    const activy = new Activy({
      index_atividade_tarefa,
      id_documento,
      quantidade_de_folha,
      hora_inicio,
      hora_termino,
      data,
      usuario,
      task,
    })

    await this.activyRepository.create(activy)

    return { activy }
  }
}
