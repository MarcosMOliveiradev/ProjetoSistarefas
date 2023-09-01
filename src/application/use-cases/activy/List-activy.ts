import { ActivyRepository } from '../../repositories/activy/Activy-repository'

export class ListActivy {
  constructor(private activyRepository: ActivyRepository) {
    Promise<void>
  }

  async execute() {
    const activyList = await this.activyRepository.findMany()

    return activyList
  }
}
