import { describe, expect, it } from 'vitest'
import { findAnaliseForUser } from './findAnaliseForUser.ts'
import { AnaliseMensalInMemoryRepository } from '../../../database/inMemory/AnaliseMensalInMemoryRepository.ts'
import { AnalisesMensais } from '../../entities/analisesMensais.ts'

describe('findAnaliseForUser Use Case', () => {
  it('returns a user analysis history', async () => {
    const repository = new AnaliseMensalInMemoryRepository()
    await repository.create(new AnalisesMensais({ usuarioId: 'u1', mes: 6, ano: 2026, diasEsperadosEmpresa: 1, diasEsperadosInstituicao: 0, diasCumpridosEmpresa: 1, diasCumpridosInstituicao: 0, atrasos: 0, geradoEm: new Date() }))
    await expect(new findAnaliseForUser(repository).execute({ userId: 'u1' })).resolves.toHaveLength(1)
  })
})
