import { describe, expect, it } from 'vitest'
import { CreateKanban } from './CreateKanban.ts'
import { KanbanInMemoryRepository } from '../../../database/inMemory/KanbanInMemoryRepository.ts'
import { KanbanColaboradoresInMemoryRepository } from '../../../database/inMemory/KanbanColaboradoresInMemoryRepository.ts'

describe('CreateKanban Use Case', () => {
  it('creates a board and adds its creator as a collaborator', async () => {
    const boards = new KanbanInMemoryRepository()
    const members = new KanbanColaboradoresInMemoryRepository()
    await new CreateKanban(boards, members).execute({ titulo: 'Rotina', descricao: 'Tarefas', codAtividades: 7, criadoPor: 'user-1', criadoEm: new Date() })
    expect(boards.items).toHaveLength(1)
    expect(members.items).toEqual([{ kanbanId: boards.items[0].id, userId: 'user-1' }])
  })
})
