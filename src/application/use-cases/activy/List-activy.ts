import { ActivyRepository } from '../../repositories/activy/Activy-repository'
interface IPage {
  page: number
}
export class ListActivy {
  constructor(private activyRepository: ActivyRepository) {
    Promise<void>
  }

  async execute({ page }: IPage) {
    try {
      const list = await this.activyRepository.findMany(page)

      return list
    } catch (err) {
      throw new Error(`message: ${err}`)
    }
  }
}
