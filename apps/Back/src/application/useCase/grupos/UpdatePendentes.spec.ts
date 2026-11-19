import { describe, expect, it, vi } from 'vitest'
import { UpdatePendentes } from './UpdatePendentes.ts'

describe('UpdatePendentes Use Case', () => {
  it('asks the presence repository to update pending records', async () => {
    const updatePresenca = vi.fn().mockResolvedValue(undefined)
    await new UpdatePendentes({ updatePresenca } as any).execute()
    expect(updatePresenca).toHaveBeenCalledOnce()
  })
})
