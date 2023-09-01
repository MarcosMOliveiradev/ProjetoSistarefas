import { ListActivy } from '../../../application/use-cases/activy/List-activy'

export class GetActivyController {
  constructor(private listActivy: ListActivy) {
    Promise<void>
  }

  async activyGet() {
    return this.listActivy.execute()
  }
}
