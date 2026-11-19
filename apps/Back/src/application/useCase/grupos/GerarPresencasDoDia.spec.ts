import { describe, expect, it, vi } from 'vitest'
import { GerarPresencasDoDia } from './GerarPresencasDoDia.ts'
import { UserGrupoInMemoryRepository } from '../../../database/inMemory/UserGrupoInMemoryRepository.ts'
import { UserGrupos } from '../../entities/userGrupos.ts'

describe('GerarPresencasDoDia Use Case', () => {
  it('creates one presence for each active group link', async () => {
    const links = new UserGrupoInMemoryRepository()
    await links.vincular(new UserGrupos({ userId: 'u1', grupoId: 'g1', dataInicio: new Date('2026-01-01') }))
    const createPresence = { execute: vi.fn().mockResolvedValue(undefined) }
    await new GerarPresencasDoDia(createPresence as any, links).execute(new Date('2026-06-01'))
    expect(createPresence.execute).toHaveBeenCalledTimes(1)
    expect(createPresence.execute).toHaveBeenCalledWith(expect.objectContaining({ userId: 'u1' }))
  })
})
