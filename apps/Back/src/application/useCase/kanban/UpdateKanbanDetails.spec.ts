import { describe, expect, it } from 'vitest'
import { UpdateKanbanDetails } from './UpdateKanbanDetails.ts'
import { KanbanInMemoryRepository } from '../../../database/inMemory/KanbanInMemoryRepository.ts'
import { Kanban } from '../../entities/kanban.ts'

describe('UpdateKanbanDetails Use Case', () => {
  it('sends the requested title and description changes to the repository', async () => {
    const repository = new KanbanInMemoryRepository()
    const board = Kanban.create({ titulo: 'Rotina', descricao: 'Tarefas', codAtividades: 7, criadoPor: 'user-1' })
    await repository.create(board)
    await new UpdateKanbanDetails(repository).execute({ id: board.id, titulo: 'Rotina atualizada', descricao: 'Prioridades' })
    expect((await repository.findById(board.id))?.titulo).toBe('Rotina atualizada')
  })
})
