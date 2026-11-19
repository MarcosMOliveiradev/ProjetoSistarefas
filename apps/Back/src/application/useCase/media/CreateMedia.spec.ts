import { describe, expect, it } from 'vitest'
import { CreateMedia } from './CreateMedia.ts'
import { MediaInMemoryRepository } from '../../../database/inMemory/MediaInMemoryRepository.ts'
import { MediaRoleInMemoryRepository } from '../../../database/inMemory/MediaRoleInMemoryRepository.ts'
import { CategoryEnum } from '../../entities/Media.ts'
import { Roles } from '../../entities/Roles.ts'

describe('CreateMedia Use Case', () => {
  it('saves media and associates it with the requested role', async () => {
    const media = new MediaInMemoryRepository()
    const roles = new MediaRoleInMemoryRepository()
    const result = await new CreateMedia(media, roles).exec({ titulo: 'Manual', description: 'PDF', category: CategoryEnum.INFORMATICA, costumerId: 'user-1', listFor: Roles.INFORMATICA, url: '/uploads/manual.pdf' })
    expect(result.media.titulo).toBe('Manual')
    expect(roles.items).toEqual([{ role: Roles.INFORMATICA, mediaId: result.media.id }])
  })
})
