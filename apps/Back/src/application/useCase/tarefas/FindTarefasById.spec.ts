import { describe, expect, it, vi } from 'vitest'
import { FindTarefasById } from './findTarefasById.ts'
import { makeTarefaDTO } from './testFixtures.ts'
describe('FindTarefasById Use Case', () => {
  it('returns a task with start and end times formatted for display', async () => {
    const dto = makeTarefaDTO(), repository = { findById: vi.fn().mockResolvedValue(dto) }
    const result = await new FindTarefasById(repository as any).execute('task-1')
    expect(result.tarefas).toMatchObject({ h_inicio: '08:00', h_termino: '08:30' })
  })
})
