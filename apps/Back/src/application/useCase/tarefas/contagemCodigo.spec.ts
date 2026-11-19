import { describe, expect, it, vi } from 'vitest'
import { ContagemCodigo } from './contagemCodigo.ts'
describe('ContagemCodigo Use Case', () => {
  it('returns the task count for an activity code', async () => {
    const count = { total: 4 }, repository = { contagemCodigo: vi.fn().mockResolvedValue(count) }
    await expect(new ContagemCodigo(repository as any).execute({ userId: 'u1', codigo: 41 })).resolves.toBe(count)
  })
})
