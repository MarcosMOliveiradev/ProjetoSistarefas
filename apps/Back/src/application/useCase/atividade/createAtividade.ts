import { Atividade } from "../../entities/Atividade.ts";
import type { AtividadeRepository } from "../../repositories/AtividadeRepository.ts";

export interface IAtividade {
  cod_atividade: number
  setor: string
  descricao: string
  tempoMedio: number
  ativado: boolean
  userId: string
}

export class CreateAtividades {
  constructor( private repository: AtividadeRepository ) {}

  async exec({ cod_atividade, descricao, setor, tempoMedio, userId, ativado }: IAtividade) {
    // TODO: Verificar se o código de atividade ja n tem cadastro

    const dados = new Atividade({
      cod_atividade,
      descricao,
      setor,
      tempoMedio,
      ativado: ativado,
      userId
    })

    const atividade = await this.repository.create(dados)

    return {
      atividade
    }
  }
}