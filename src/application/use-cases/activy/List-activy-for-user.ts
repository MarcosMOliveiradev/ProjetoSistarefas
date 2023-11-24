import { ActivyRepository } from '../../repositories/activy/Activy-repository'

interface IMatriculaRequest {
  matricula: number
}

export class ListActivyForUser {
  constructor(private activyRepositori: ActivyRepository) {
    Promise<void>
  }

  async execute(request: IMatriculaRequest) {
    const { matricula } = request

    return await this.activyRepositori.findForMatricula(matricula)
  }
}
