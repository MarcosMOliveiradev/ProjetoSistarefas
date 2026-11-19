import { describe, expect, it } from 'vitest'
import { ListAtividades } from './listAtividades.ts'
import { AtividadeInMemoryRepository } from '../../../database/inMemory/AtividadeInMemoryRepository.ts'
import { Atividade } from '../../entities/Atividade.ts'

describe('ListAtividades Use Case', () => {
  it('lists activities and formats the average duration as a timer', async () => {
    const repository = new AtividadeInMemoryRepository()
    await repository.create(new Atividade({ cod_atividade: 41, setor: 'TI', descricao: 'Cadastro', tempoMedio: 90, ativado: true, userId: 'user-1' }))
    const result = await new ListAtividades(repository).execute()
    expect(result[0].tempo_medio).toBe('01:30')
  })
})
