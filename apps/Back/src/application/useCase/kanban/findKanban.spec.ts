import { describe, expect, it } from 'vitest'
import { findKanban } from './findKanban.ts'
import { KanbanInMemoryRepository } from '../../../database/inMemory/KanbanInMemoryRepository.ts'
import { Kanban } from '../../entities/kanban.ts'

describe('findKanban Use Case', () => {
  it('lists all boards', async () => {
    const repository = new KanbanInMemoryRepository()
    await repository.create(Kanban.create({ titulo: 'Rotina', descricao: 'Tarefas', codAtividades: 7, criadoPor: 'user-1' }))
    await expect(new findKanban(repository).execute()).resolves.toHaveLength(1)
  })
})
