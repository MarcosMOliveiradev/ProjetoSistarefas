import { describe, expect, it, vi } from 'vitest'
import { ListaTarefas } from './ListTarefas.ts'
import { makeTarefaDTO } from './testFixtures.ts'
describe('ListaTarefas Use Case', () => {
  it('lists a user day and formats task times', async () => {
    const repository = { listTarefas: vi.fn().mockResolvedValue([makeTarefaDTO()]) }
    const result = await new ListaTarefas(repository as any).exec({ data: '2026-06-01', userId: 'u1' })
    expect(result[0].tarefas.h_inicio).toBe('08:00')
  })
})
