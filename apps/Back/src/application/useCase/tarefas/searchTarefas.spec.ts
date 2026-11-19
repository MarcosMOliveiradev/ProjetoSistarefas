import { describe, expect, it, vi } from 'vitest'
import { SearchTarefas, SearchType } from './searchTarefas.ts'
import { makeTarefaDTO } from './testFixtures.ts'
describe('SearchTarefas Use Case', () => {
  it('converts numeric search values and formats matched task times', async () => {
    const repository = { searchTarefasByType: vi.fn().mockResolvedValue([makeTarefaDTO()]) }
    const result = await new SearchTarefas(repository as any).execute({ type: SearchType.cod_atividade, value: '41', userId: 'u1' })
    expect(repository.searchTarefasByType).toHaveBeenCalledWith(SearchType.cod_atividade, 41, 'u1')
    expect(result[0].tarefas.h_termino).toBe('08:30')
  })
})
