import { describe, expect, it } from 'vitest'
import { DadosForPDF } from './DadosForPDF.ts'
import { AnaliseMensalInMemoryRepository } from '../../../database/inMemory/AnaliseMensalInMemoryRepository.ts'
import { AnalisesMensais } from '../../entities/analisesMensais.ts'

describe('DadosForPDF Use Case', () => {
  it('returns the monthly analysis data used by the PDF', async () => {
    const repository = new AnaliseMensalInMemoryRepository()
    const analysis = new AnalisesMensais({ usuarioId: 'u1', mes: 6, ano: 2026, diasEsperadosEmpresa: 0, diasEsperadosInstituicao: 0, diasCumpridosEmpresa: 0, diasCumpridosInstituicao: 0, atrasos: 0, geradoEm: new Date() })
    await repository.create(analysis)
    await expect(new DadosForPDF(repository).execute({ userId: 'u1', mes: 6, ano: 2026 })).resolves.toBe(analysis)
  })
})
