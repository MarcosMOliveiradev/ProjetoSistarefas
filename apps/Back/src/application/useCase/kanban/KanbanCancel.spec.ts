import { describe, expect, it } from 'vitest'
import { KanbanCancel } from './KanbanCancel.ts'
import { KanbanInMemoryRepository } from '../../../database/inMemory/KanbanInMemoryRepository.ts'
import { Kanban } from '../../entities/kanban.ts'
import { kanbanStatusEnum } from '../../entities/Roles.ts'

describe('KanbanCancel Use Case', () => {
  it('cancels the board and preserves the cancellation reason', async () => {
    const repository = new KanbanInMemoryRepository()
    const board = Kanban.create({ titulo: 'Rotina', descricao: 'Tarefas', codAtividades: 7, criadoPor: 'user-1' })
    await repository.create(board)
    await new KanbanCancel(repository).execute({ id: board.id, userId: 'user-2', motivo: 'Duplicado' })
    expect(board.status).toBe(kanbanStatusEnum.CANCELED)
    expect(board.motivoCancelamento).toBe('Duplicado')
  })
})
