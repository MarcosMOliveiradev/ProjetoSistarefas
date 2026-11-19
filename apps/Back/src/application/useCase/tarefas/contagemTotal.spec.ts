import { describe, expect, it, vi } from 'vitest'
import { contagemTotal } from './contagemTotal.ts'
describe('contagemTotal Use Case', () => {
  it('returns the total task count for a user', async () => {
    const result = { total: 9 }, repository = { contagem: vi.fn().mockResolvedValue(result) }
    await expect(new contagemTotal(repository as any).execut({ userId: 'u1' })).resolves.toBe(result)
  })
})
