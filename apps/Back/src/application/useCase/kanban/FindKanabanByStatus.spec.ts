import { describe, expect, it } from 'vitest'
import { FindKanbanByStatus } from './FindKanabanByStatus.ts'
import { KanbanInMemoryRepository } from '../../../database/inMemory/KanbanInMemoryRepository.ts'
import { Kanban } from '../../entities/kanban.ts'
import { kanbanStatusEnum } from '../../entities/Roles.ts'

describe('FindKanbanByStatus Use Case', () => {
  it('returns boards with the requested status', async () => {
    const repository = new KanbanInMemoryRepository()
    await repository.create(Kanban.create({ titulo: 'Rotina', descricao: 'Tarefas', codAtividades: 7, criadoPor: 'user-1' }))
    await expect(new FindKanbanByStatus(repository).execute({ status: kanbanStatusEnum.TODO })).resolves.toHaveLength(1)
  })
})
