import { ActivyRepository } from '../../repositories/activy/Activy-repository'

interface IListDateRequest {
  data: string
  permission: boolean
  matricula: number
}

export class ListActivyForDateEndUser {
  constructor(private activyRepository: ActivyRepository) {
    Promise<void>
  }

  async execute(request: IListDateRequest) {
    const { data, permission, matricula } = request

    if (permission !== true) {
      throw new Error('Você não tem permissão para listar as atividades')
    }

    return await this.activyRepository.listUserActivy(data, matricula)
  }
}
