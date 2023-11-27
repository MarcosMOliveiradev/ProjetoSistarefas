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
      const nome = objeto.usuario.nome
      const matricula = objeto.usuario.matricula
      const matriculas = 'matricula'
      const nomes = 'nomes'
      const Total = 'Total'

      if (count[descricao]) {
        count[descricao]++
      } else {
        count[nomes] = nome
        count[matriculas] = matricula
        count[descricao] = 1
      }

      count[Total] = (count[Total] || 0) + 1
    })

    return { count }
  }
}
