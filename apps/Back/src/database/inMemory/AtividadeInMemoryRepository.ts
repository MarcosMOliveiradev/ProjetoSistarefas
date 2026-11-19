import type { atividadesDTO } from '../../DTOs/AtividadesDTO.ts'
import type { Atividade } from '../../application/entities/Atividade.ts'
import { AtividadeRepository } from '../../application/repositories/AtividadeRepository.ts'

export class AtividadeInMemoryRepository extends AtividadeRepository {
  public items: Atividade[] = []
  private toDTO(item: Atividade): atividadesDTO {
    return { cod_atividade: item.cod_atividade, setor: item.setor, descricao: item.descricao, tempo_medio: item.tempoMedio, ativado: item.ativado, usuarioId: item.userId }
  }
  async create(atividade: Atividade): Promise<atividadesDTO> {
    this.items.push(atividade)
    return this.toDTO(atividade)
  }
  async find(): Promise<atividadesDTO[]> { return this.items.map(item => this.toDTO(item)) }
  async findForCod(cod: number): Promise<atividadesDTO> {
    const item = this.items.find(item => item.cod_atividade === cod)
    return item ? this.toDTO(item) : undefined as unknown as atividadesDTO
  }
}
