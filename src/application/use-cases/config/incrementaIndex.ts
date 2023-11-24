import { ActivyRepository } from '../../repositories/activy/Activy-repository'

interface IMatriculaRequest {
  matricula: number
}
export class IncrementaIndex {
  constructor(private activyRepository: ActivyRepository) {
    Promise<void>
  }

  async execut(request: IMatriculaRequest): Promise<number> {
    const { matricula } = request

    const indexActivy = await this.activyRepository.findForMatricula(matricula)

    const listaIndex: any[] = []

    indexActivy.forEach((e: any) => {
      const index = e.index_atividade_tarefa

      listaIndex.push(index)
    })

    const ultimoIndex = listaIndex[listaIndex.length - 1]

    return ultimoIndex
  }
}
