import { describe, expect, it } from 'vitest'
import { CreateAtividades } from './createAtividade.ts'
import { AtividadeInMemoryRepository } from '../../../database/inMemory/AtividadeInMemoryRepository.ts'

describe('CreateAtividades Use Case', () => {
  it('creates an activity with the supplied code, sector, and duration', async () => {
    const repository = new AtividadeInMemoryRepository()
    const useCase = new CreateAtividades(repository)
    const result = await useCase.exec({ cod_atividade: 41, setor: 'TI', descricao: 'Cadastro', tempoMedio: 30, ativado: true, userId: 'user-1' })
    expect(result.atividade).toMatchObject({ cod_atividade: 41, setor: 'TI', tempo_medio: 30 })
    expect(repository.items).toHaveLength(1)
  })
})
