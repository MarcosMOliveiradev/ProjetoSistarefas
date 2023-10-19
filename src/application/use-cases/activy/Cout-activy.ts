import { Activy } from '../../entites/activy/activy'
import { ActivyRepository } from '../../repositories/activy/Activy-repository'

interface IMatriculaRequest {
  matricula: number
}
interface Iresponse {
  activy: Activy
}

export class Cout {
  constructor(private activyRepository: ActivyRepository) {
    Promise<void>
  }

  async exec(request: IMatriculaRequest) {
    const { matricula } = request

    // TODO: lidar com erros.

    const activy = await this.activyRepository.count(matricula)

    activy.forEach((objeto: any) => {
      const respose = objeto.Tarefas.codigo
    })

    return { activy }
  }
}
