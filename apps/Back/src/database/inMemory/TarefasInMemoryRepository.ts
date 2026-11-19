import type { Tarefas } from '../../application/entities/tarefa.ts'
import { TarefasRepository, type IUpdataTarefas } from '../../application/repositories/TarefasRepository.ts'
import type { SearchType } from '../../application/useCase/tarefas/searchTarefas.ts'

export class TarefasInMemoryRepository extends TarefasRepository {
  public items: Tarefas[] = []
  private dto(item: Tarefas): any { return { tarefas: { id: item.id, data: item.data, item: item.item, cod_atividade: item.codAtividade, qtd_folha: item.qtdFolha ?? 0, id_documento: item.idDocumento, h_inicio: item.hInicio, h_termino: item.hTermino, n_atendimento: item.nAtendimento, ativado: item.ativado, usuarioId: item.userId, createdAt: item.createdAt, updatedAt: item.updateAt }, Atividade: { cod_atividade: item.codAtividade, setor: '', descricao: '', tempo_medio: 0, ativado: true, usuarioId: item.userId } } }
  async findById(id: string): Promise<any> { const item = this.items.find(x => x.id === id); return item ? this.dto(item) : null }
  async create(data: Tarefas): Promise<any> { this.items.push(data); return { id: data.id, data: data.data, item: data.item, cod_atividade: data.codAtividade, qtd_folha: data.qtdFolha ?? 0, id_documento: data.idDocumento, h_inicio: data.hInicio, h_termino: data.hTermino, n_atendimento: data.nAtendimento, ativado: data.ativado, usuarioId: data.userId, createdAt: data.createdAt, updatedAt: data.updateAt } }
  async listTarefas(data: string, userId: string): Promise<any[]> { return this.items.filter(x => x.data === data && x.userId === userId).map(x => this.dto(x)) }
  async listTarefasByDateInterval(start: string, end: string, userId: string): Promise<any[]> { return this.items.filter(x => x.data >= start && x.data <= end && x.userId === userId).map(x => this.dto(x)) }
  async deleteTarefa(id: string, ativado: boolean, userId: string): Promise<void> { const x = this.items.find(i => i.id === id && i.userId === userId); if (x) x.ativado = ativado }
  async searchTarefasByType(type: SearchType, value: string | number, userId?: string): Promise<any[]> { return this.items.filter(x => (!userId || x.userId === userId) && (type === 'id_documento' ? x.idDocumento === value : type === 'cod_atividade' ? x.codAtividade === value : type === 'n_atendimento' ? x.nAtendimento === value : x.data === value)).map(x => this.dto(x)) }
  async updateTarefa(data: IUpdataTarefas): Promise<void> { const x = this.items.find(i => i.id === data.id); if (!x) return; if (data.data !== undefined) x.data = data.data; if (data.item !== undefined) x.item = data.item; if (data.codAtividade !== undefined) x.codAtividade = data.codAtividade; if (data.qtdFolha !== undefined) x.qtdFolha = data.qtdFolha; if (data.idDocumento !== undefined) x.idDocumento = data.idDocumento; if (data.h_inicio != null) x.hInicio = data.h_inicio; if (data.h_termino != null) x.hTermino = data.h_termino; if (data.nAtendimento !== undefined) x.nAtendimento = data.nAtendimento }
  async countDepartment(userId: string, setor: string): Promise<any> { return { setor, total: this.items.filter(x => x.userId === userId).length } }
  async contagemCodigo(userId: string, codigo: number): Promise<any> { return { codigo, total: this.items.filter(x => x.userId === userId && x.codAtividade === codigo).length } }
  async contagem(userId: string): Promise<any> { return { total: this.items.filter(x => x.userId === userId).length } }
  async averageTime(userId: string): Promise<number | null> { const xs = this.items.filter(x => x.userId === userId); return xs.length ? xs.reduce((n,x) => n + x.hTermino - x.hInicio, 0) / xs.length : null }
  async top5atividedes(userId: string): Promise<any[] | null> {
    const counts = new Map<number, number>()
    for (const item of this.items.filter(x => x.userId === userId)) counts.set(item.codAtividade, (counts.get(item.codAtividade) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([codigo, total]) => ({ atividades: codigo, nome: String(codigo), total }))
  }
  async qtdMeses(userId: string): Promise<any[] | null> {
    const counts = new Map<string, number>()
    for (const item of this.items.filter(x => x.userId === userId)) {
      const mes = item.data.slice(0, 7)
      counts.set(mes, (counts.get(mes) ?? 0) + 1)
    }
    return [...counts.entries()].map(([mes, total]) => ({ mes, total }))
  }
  async totalTarefas(): Promise<any> { return { total: this.items.length } }
}
