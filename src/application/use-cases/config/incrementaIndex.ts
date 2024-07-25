import { ActivyRepository } from '../../repositories/activy/Activy-repository'

interface IMatriculaRequest {
  matricula: number
}
export class IncrementaIndex {
  constructor(private activyRepository: ActivyRepository) {
    Promise<void>
  }

  async execut(request: IMatriculaRequest): Promise<number> {
    let ultimoIndex: number
    const { matricula } = request

    const indexActivy = await this.activyRepository.findForMatricula(matricula)

    const listaIndex: any[] = []

    indexActivy.forEach((e: any) => {
      const index = e.index_atividade_tarefa

      listaIndex.push(index)
    })

    if (listaIndex.length === 0) {
      return (ultimoIndex = 0)
    }

    ultimoIndex = listaIndex[listaIndex.length - 1]

    return ultimoIndex
  }
}
