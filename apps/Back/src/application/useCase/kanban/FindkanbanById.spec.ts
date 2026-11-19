import { describe, expect, it } from 'vitest'
import { FindKanbanById } from './FindkanbanById.ts'
import { KanbanInMemoryRepository } from '../../../database/inMemory/KanbanInMemoryRepository.ts'
import { Kanban } from '../../entities/kanban.ts'

describe('FindKanbanById Use Case', () => {
  it('returns the board matching the requested id', async () => {
    const repository = new KanbanInMemoryRepository()
    const board = Kanban.create({ titulo: 'Rotina', descricao: 'Tarefas', codAtividades: 7, criadoPor: 'user-1' })
    await repository.create(board)
    await expect(new FindKanbanById(repository).execute({ id: board.id })).resolves.toBe(board)
  })
})
