import { describe, expect, it, vi } from 'vitest'
import { TopFiveActive } from './topFiveActive.ts'
describe('TopFiveActive Use Case', () => {
  it('returns the five most used activity codes', async () => {
    const result = [{ codigo: 41, total: 3 }], repository = { top5atividedes: vi.fn().mockResolvedValue(result) }
    await expect(new TopFiveActive(repository as any).execute({ userId: 'u1' })).resolves.toBe(result)
  })
})
