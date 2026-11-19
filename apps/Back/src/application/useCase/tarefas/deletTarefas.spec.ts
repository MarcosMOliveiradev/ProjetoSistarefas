import { describe, expect, it, vi } from 'vitest'
import { DeletTarefas } from './deletTarefas.ts'
describe('DeletTarefas Use Case', () => {
  it('requests deletion with the task, activation state, and owner', async () => {
    const deleteTarefa = vi.fn(), repository = { deleteTarefa }
    await new DeletTarefas(repository as any).execute({ id: 't1', ativado: false, userId: 'u1' })
    expect(deleteTarefa).toHaveBeenCalledWith('t1', false, 'u1')
  })
})
