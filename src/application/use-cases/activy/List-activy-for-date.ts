import { ActivyRepository } from '../../repositories/activy/Activy-repository'

interface IListDateRequest {
  data: string
  user: string
}

export class ListActivyForDate {
  constructor(private activyRepository: ActivyRepository) {
    Promise<void>
  }

  async execute(request: IListDateRequest) {
    const { data, user } = request

    return await this.activyRepository.listDate(data, user)
  }
}
