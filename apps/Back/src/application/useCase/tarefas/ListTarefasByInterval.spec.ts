import { describe, expect, it, vi } from 'vitest'
import { ListTarefasByInterval } from './ListTarefasByInterval.ts'
describe('ListTarefasByInterval Use Case', () => {
  it('returns tasks between the requested start and end dates', async () => {
    const result = [{ tarefas: { id: 't1' } }], repository = { listTarefasByDateInterval: vi.fn().mockResolvedValue(result) }
    await expect(new ListTarefasByInterval(repository as any).execute({ userId: 'u1', startDate: '2026-06-01', endDate: '2026-06-30' })).resolves.toBe(result)
  })
})
