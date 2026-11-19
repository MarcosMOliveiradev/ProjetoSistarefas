import { describe, expect, it, vi } from 'vitest'
import { CreateTarefas } from './CreateTarefas.ts'
describe('CreateTarefas Use Case', () => {
  it('splits a multi-document request into evenly timed task entries', async () => {
    const create = vi.fn(async (task: any) => ({ id: task.id })), taskRepo = { create }, activityRepo = { findForCod: vi.fn().mockResolvedValue({ cod_atividade: 41 }) }
    const result = await new CreateTarefas(taskRepo as any, activityRepo as any).exec({ data: '2026-06-01', item: 1, codAtividade: 41, idDocumento: 'A B', qtdFolha: 2, hInicioController: '08:00', hTerminoController: '09:00', nAtendimento: 1, userId: 'u1' })
    expect(result).toHaveLength(2)
    expect(create).toHaveBeenCalledTimes(2)
  })
})
