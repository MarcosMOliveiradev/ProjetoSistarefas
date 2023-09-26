import { ActivyRepository } from '../../repositories/activy/Activy-repository'

interface IListDateRequest {
  dataConsulta: string
  user: string
}

export class ListActivyForIntervalDate {
  constructor(private activyRepository: ActivyRepository) {
    Promise<void>
  }

  async execute(request: IListDateRequest) {
    const { dataConsulta, user } = request

    return await this.activyRepository.listIntervalDate(dataConsulta, user)
  }
}
