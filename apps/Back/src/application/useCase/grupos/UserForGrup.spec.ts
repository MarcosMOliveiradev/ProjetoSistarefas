import { describe, expect, it } from 'vitest'
import { UserForGrup } from './userForGrup.ts'
import { UserGrupoInMemoryRepository } from '../../../database/inMemory/UserGrupoInMemoryRepository.ts'

describe('UserForGrup Use Case', () => {
  it('creates a user to group relationship when no active link exists', async () => {
    const repository = new UserGrupoInMemoryRepository()
    await new UserForGrup(repository).execute({ userId: 'user-1', grupoId: 'group-1', dataInicio: new Date() })
    expect(repository.items).toHaveLength(1)
    expect(repository.items[0].grupoId).toBe('group-1')
  })
})
