import { describe, expect, it, vi } from 'vitest'
import { AverageTime } from './averageTime.ts'
describe('AverageTime Use Case', () => {
  it('formats the average duration returned by the repository', async () => {
    const repository = { averageTime: vi.fn().mockResolvedValue(90) }
    await expect(new AverageTime(repository as any).execute({ userId: 'u1' })).resolves.toBe('01:30')
  })
})
