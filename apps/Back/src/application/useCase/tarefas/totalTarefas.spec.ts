import { describe, expect, it, vi } from 'vitest'
import { TotalTarefas } from './totalTarefas.ts'
describe('TotalTarefas Use Case', () => {
  it('returns the global task total', async () => {
    const result = { total: 12 }, repository = { totalTarefas: vi.fn().mockResolvedValue(result) }
    await expect(new TotalTarefas(repository as any).execute()).resolves.toBe(result)
  })
})
