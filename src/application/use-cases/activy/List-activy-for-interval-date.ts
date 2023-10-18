import { ActivyRepository } from '../../repositories/activy/Activy-repository'

interface IListDateRequest {
  dataIntervalo: string
  user: string
}

export class ListActivyForIntervalDate {
  constructor(private activyRepository: ActivyRepository) {
    Promise<void>
  }

  async execute(request: IListDateRequest) {
    const { dataIntervalo, user } = request

    const regex = /-(\d{2})-/

    const dataMes = dataIntervalo.match(regex)

    if (dataMes == null) {
      throw new Error('erro ao preencher o campo mes')
    }
    const dataConsulta = dataMes[0]

    return await this.activyRepository.listIntervalDate(dataConsulta, user)
  }
}
