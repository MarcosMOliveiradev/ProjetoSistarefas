import { describe, expect, it, vi } from 'vitest'
import { CreateGrupos } from './CreateGrupos.ts'
import { GrupoInMemoryRepository } from '../../../database/inMemory/GrupoInMemoryRepository.ts'

describe('CreateGrupos Use Case', () => {
  it('creates a group with a valid weekly schedule', async () => {
    const repository = new GrupoInMemoryRepository()
    await new CreateGrupos(repository).execute({ nome: 'Equipe A', diasEmpresa: [1,3], diasInstituicao: [2], dataInicio: new Date('2026-01-01') })
    expect(repository.items[0].nome).toBe('Equipe A')
  })
  it('rejects overlapping company and institution days', async () => {
    const repository = new GrupoInMemoryRepository()
    await expect(new CreateGrupos(repository).execute({ nome: 'Inválido', diasEmpresa: [1], diasInstituicao: [1], dataInicio: new Date() })).rejects.toThrow()
  })
})
