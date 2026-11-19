import { describe, expect, it } from 'vitest'
import { DeleteKanban } from './DeleteKanban.ts'
import { KanbanInMemoryRepository } from '../../../database/inMemory/KanbanInMemoryRepository.ts'
import { Kanban } from '../../entities/kanban.ts'

describe('DeleteKanban Use Case', () => {
  it('deletes the requested board', async () => {
    const repository = new KanbanInMemoryRepository()
    const board = Kanban.create({ titulo: 'Rotina', descricao: 'Tarefas', codAtividades: 7, criadoPor: 'user-1' })
    await repository.create(board)
    await new DeleteKanban(repository).execute(board.id)
    expect(repository.items).toHaveLength(0)
  })
})
