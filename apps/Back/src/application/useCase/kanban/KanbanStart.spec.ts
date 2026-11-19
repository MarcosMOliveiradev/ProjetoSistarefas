import { describe, expect, it } from 'vitest'
import { KanbanStart } from './KanbanStart.ts'
import { KanbanInMemoryRepository } from '../../../database/inMemory/KanbanInMemoryRepository.ts'
import { Kanban } from '../../entities/kanban.ts'
import { kanbanStatusEnum } from '../../entities/Roles.ts'

describe('KanbanStart Use Case', () => {
  it('moves the board into progress and records who started it', async () => {
    const repository = new KanbanInMemoryRepository()
    const board = Kanban.create({ titulo: 'Rotina', descricao: 'Tarefas', codAtividades: 7, criadoPor: 'user-1' })
    await repository.create(board)
    await new KanbanStart(repository).execute({ id: board.id, userId: 'user-2' })
    expect(board.status).toBe(kanbanStatusEnum.IN_PROGRESS)
    expect(board.iniciadoPor).toBe('user-2')
  })
})
