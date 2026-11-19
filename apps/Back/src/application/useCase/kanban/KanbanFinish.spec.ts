import { describe, expect, it } from 'vitest'
import { KanbanFinish } from './KanbanFinish.ts'
import { KanbanInMemoryRepository } from '../../../database/inMemory/KanbanInMemoryRepository.ts'
import { Kanban } from '../../entities/kanban.ts'
import { kanbanStatusEnum } from '../../entities/Roles.ts'

describe('KanbanFinish Use Case', () => {
  it('marks the board as completed', async () => {
    const repository = new KanbanInMemoryRepository()
    const board = Kanban.create({ titulo: 'Rotina', descricao: 'Tarefas', codAtividades: 7, criadoPor: 'user-1' })
    await repository.create(board)
    await new KanbanFinish(repository).execute({ id: board.id, userId: 'user-2' })
    expect(board.status).toBe(kanbanStatusEnum.DONE)
  })
})
