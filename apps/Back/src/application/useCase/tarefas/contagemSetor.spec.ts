import { describe, expect, it, vi } from 'vitest'
import { ContagemSetor } from './contagemSetor.ts'
describe('ContagemSetor Use Case', () => {
  it('returns the task count for a department', async () => {
    const result = { total: 4 }, repository = { countDepartment: vi.fn().mockResolvedValue(result) }
    await expect(new ContagemSetor(repository as any).execute({ userId: 'u1', setor: 'TI' })).resolves.toBe(result)
  })
})
