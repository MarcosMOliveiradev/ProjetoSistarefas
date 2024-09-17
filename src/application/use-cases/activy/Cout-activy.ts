import { ActivyRepository } from '../../repositories/activy/Activy-repository'

interface IMatriculaRequest {
  matricula: number
  permission: boolean
}

export class Cout {
  constructor(private activyRepository: ActivyRepository) {
    Promise<void>
  }

  async exec(request: IMatriculaRequest) {
    const { matricula, permission } = request

    // TODO: lidar com erros.
    if (permission !== true) {
      throw new Error('Você não tem permissão!')
    }

    const activy = await this.activyRepository.count(matricula)

    const count: any = {}
    activy.forEach((objeto: any) => {
      const descricao = objeto.Tarefas.descricao
      const Total = 'Total'

      if (count[descricao]) {
        count[descricao]++
      } else {
        count[descricao] = 1
      }

      count[Total] = (count[Total] || 0) + 1
    })

    const result = Object.keys(count).map((descricao) => ({
      contagem: descricao,
      total: count[descricao],
    }))

    return result
  }
}
