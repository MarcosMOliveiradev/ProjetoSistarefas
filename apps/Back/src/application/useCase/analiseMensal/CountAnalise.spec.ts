import { describe, expect, it } from 'vitest'
import { CountAnalise } from './CountAnalise.ts'
import { AnaliseMensalInMemoryRepository } from '../../../database/inMemory/AnaliseMensalInMemoryRepository.ts'

describe('CountAnalise Use Case', () => {
  it('returns the analysis count for a user', async () => {
    const repository = new AnaliseMensalInMemoryRepository()
    await expect(new CountAnalise(repository).execute({ usuarioId: 'u1' })).resolves.toMatchObject({ total: 0 })
  })
})
