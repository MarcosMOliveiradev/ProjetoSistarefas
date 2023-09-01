import { Activy } from '../../entites/activy/activy'

export abstract class ActivyRepository {
  abstract create(activy: Activy): Promise<void>
}
