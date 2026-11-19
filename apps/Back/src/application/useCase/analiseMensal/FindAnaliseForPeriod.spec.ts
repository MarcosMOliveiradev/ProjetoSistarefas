import { describe, expect, it } from 'vitest'
import { FindAnaliseForPeriod } from './FindAnaliseForPeriod.ts'
import { AnaliseMensalInMemoryRepository } from '../../../database/inMemory/AnaliseMensalInMemoryRepository.ts'
import { AnalisesMensais } from '../../entities/analisesMensais.ts'

describe('FindAnaliseForPeriod Use Case', () => {
  it('returns analyses matching the requested month and year', async () => {
    const repository = new AnaliseMensalInMemoryRepository()
    await repository.create(new AnalisesMensais({ usuarioId: 'u1', mes: 6, ano: 2026, diasEsperadosEmpresa: 0, diasEsperadosInstituicao: 0, diasCumpridosEmpresa: 0, diasCumpridosInstituicao: 0, atrasos: 0, geradoEm: new Date() }))
    await expect(new FindAnaliseForPeriod(repository).execute({ mes: 6, ano: 2026 })).resolves.toHaveLength(1)
  })
})
