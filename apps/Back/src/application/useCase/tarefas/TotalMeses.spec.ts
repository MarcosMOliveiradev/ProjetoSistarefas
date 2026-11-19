import { describe, expect, it, vi } from 'vitest'
import { TotalMeses } from './TotalMeses.ts'
describe('TotalMeses Use Case', () => {
  it('returns the monthly task totals for a user', async () => {
    const result = [{ mes: '2026-06', total: 3 }], repository = { qtdMeses: vi.fn().mockResolvedValue(result) }
    await expect(new TotalMeses(repository as any).execute({ userId: 'u1' })).resolves.toBe(result)
  })
})
