import type { tarefasDTO } from '../../../DTOs/TarefasDTO.ts'
import { Tarefas } from '../../entities/tarefa.ts'

export function makeTarefa(overrides: Record<string, unknown> = {}): Tarefas {
  return new Tarefas({ data: '2026-06-01', item: 1, codAtividade: 41, idDocumento: 'DOC-1', qtdFolha: 2, hInicio: 480, hTermino: 510, nAtendimento: 7, ativado: true, userId: 'u1', ...overrides } as any)
}

export function makeTarefaDTO(): tarefasDTO {
  return { tarefas: { id: 'task-1', data: '2026-06-01', item: 1, cod_atividade: 41, qtd_folha: 2, id_documento: 'DOC-1', h_inicio: 480, h_termino: 510, n_atendimento: 7, ativado: true, usuarioId: 'u1', createdAt: new Date(), updatedAt: null }, Atividade: { cod_atividade: 41, setor: 'TI', descricao: 'Cadastro', tempo_medio: 30, ativado: true, usuarioId: 'u1' } }
}
