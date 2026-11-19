import { describe, expect, it, vi } from 'vitest'
import { DeleteMedia } from './DeleteMadia.ts'
import { MediaInMemoryRepository } from '../../../database/inMemory/MediaInMemoryRepository.ts'
import { Media, CategoryEnum } from '../../entities/Media.ts'

describe('DeleteMedia Use Case', () => {
  it('removes the media record after locating its file', async () => {
    const repository = new MediaInMemoryRepository()
    const media = new Media({ titulo: 'Manual', category: CategoryEnum.INFORMATICA, costumerId: 'user-1', url: '/uploads/missing.pdf' })
    await repository.create(media)
    vi.spyOn(console, 'error').mockImplementation(() => {})
    await new DeleteMedia(repository).execute({ id: media.id })
    expect(repository.items).toHaveLength(0)
    vi.restoreAllMocks()
  })
})
