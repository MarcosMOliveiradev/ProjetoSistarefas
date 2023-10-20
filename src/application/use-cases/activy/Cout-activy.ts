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

    const count: any = {}
    activy.forEach((objeto: any) => {
      const codigo = objeto.Tarefas.codigo
      const nome = objeto.usuario.nome
      const matricula = objeto.usuario.matricula
      const setor = objeto.Tarefas.setor
      const matriculas = 'matricula'
      const nomes = 'nomes'

      if (count[codigo]) {
        count[nomes] = nome
        count[matriculas] = matricula
        count[codigo]++
        count[setor]++
      } else {
        count[nomes] = nome
        count[matriculas] = matricula
        count[codigo] = 1
        count[setor] = 1
      }
    })

    return { count }
  }
}
