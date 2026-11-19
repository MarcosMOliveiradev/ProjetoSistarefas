import { describe, expect, it } from 'vitest'
import { ListMedias } from './ListMedias.ts'
import { MediaInMemoryRepository } from '../../../database/inMemory/MediaInMemoryRepository.ts'
import { Media, CategoryEnum } from '../../entities/Media.ts'
import { Roles } from '../../entities/Roles.ts'

describe('ListMedias Use Case', () => {
  it('returns media entries for the requested role', async () => {
    const repository = new MediaInMemoryRepository()
    await repository.create(new Media({ titulo: 'Manual', category: CategoryEnum.INFORMATICA, costumerId: 'user-1', url: '/manual.pdf' }))
    await expect(new ListMedias(repository).exec({ role: Roles.INFORMATICA })).resolves.toHaveLength(1)
  })
})
