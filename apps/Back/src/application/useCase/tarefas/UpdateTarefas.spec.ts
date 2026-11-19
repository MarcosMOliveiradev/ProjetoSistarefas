import { describe, expect, it, vi } from 'vitest'
import { UpdateTarefas } from './updateTarefas.ts'
import { makeTarefaDTO } from './testFixtures.ts'
describe('UpdateTarefas Use Case', () => {
  it('updates only a task owned by the requesting user and converts times to minutes', async () => {
    const updateTarefa = vi.fn(), repository = { findById: vi.fn().mockResolvedValue(makeTarefaDTO()), updateTarefa }
    await new UpdateTarefas(repository as any).execute({ id: 'task-1', hInicioController: '09:00', hTerminoController: '09:30' }, 'u1')
    expect(updateTarefa).toHaveBeenCalledWith(expect.objectContaining({ id: 'task-1', h_inicio: 540, h_termino: 570 }))
  })
  it('rejects updates from a different task owner', async () => {
    const repository = { findById: vi.fn().mockResolvedValue(makeTarefaDTO()), updateTarefa: vi.fn() }
    await expect(new UpdateTarefas(repository as any).execute({ id: 'task-1' }, 'other')).rejects.toThrow('Usuário não autorizado')
  })
})
