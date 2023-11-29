import { PrismaActivyRepository } from '../../../database/prisma/repositoris/prisma-activy-repository'
import { Activy } from '../../entites/activy/activy'
import { ActivyRepository } from '../../repositories/activy/Activy-repository'
import { TaskRepository } from '../../repositories/tasks/task-repository'
import { IncrementaIndex } from '../config/incrementaIndex'

const activyRepository = new PrismaActivyRepository()
const incrementaIndex = new IncrementaIndex(activyRepository)

interface IActivyRequest {
  id_documento?: string
  quantidade_de_folha?: string
  hora_inicio: string
  hora_termino: string
  data: string
  matricula: number

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
      id_documento,
      quantidade_de_folha,
      hora_inicio,
      hora_termino,
      data,
      usuario,
      codigo,
      matricula,
    } = request

    const task = await this.taskRepository.id(codigo)
    let activy: any = {}

    const lista = await incrementaIndex.execut({ matricula })

    if (id_documento === undefined) {
      const newIndex = lista + 1

      activy = new Activy({
        index_atividade_tarefa: newIndex,
        id_documento,
        quantidade_de_folha,
        hora_inicio,
        hora_termino,
        data,
        usuario,
        task,
      })
      await this.activyRepository.create(activy)
    }

    if (id_documento !== undefined) {
      const codigoLista = id_documento.split(' ')

      if (codigoLista.length > 1) {
        let newIndex = lista + 1
        for (let i = 0; i < codigoLista.length; i++) {
          activy = new Activy({
            index_atividade_tarefa: newIndex,
            id_documento: codigoLista[i],
            quantidade_de_folha,
            hora_inicio,
            hora_termino,
            data,
            usuario,
            task,
          })
          await this.activyRepository.create(activy)
          newIndex++
        }
        return { activy }
      } else {
        const newIndex = lista + 1

        activy = new Activy({
          index_atividade_tarefa: newIndex,
          id_documento: codigoLista[0],
          quantidade_de_folha,
          hora_inicio,
          hora_termino,
          data,
          usuario,
          task,
        })

        await this.activyRepository.create(activy)
      }
    }

    return { activy }
  }
}
