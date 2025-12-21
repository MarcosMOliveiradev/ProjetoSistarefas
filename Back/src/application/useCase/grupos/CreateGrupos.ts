import { Grupo } from "../../entities/grupo.ts";
import type { GrupoRepository } from "../../repositories/GrupoRepository.ts";

interface IGrupos {
  nome: string;
  diasEmpresa: number[];
  diasInstituicao: number[];
  dataInicio: Date
  dataFim?: Date | null
}

export class CreateGrupos {
  constructor (private grupoRepository: GrupoRepository) {}

  async execute({ dataFim, dataInicio, diasEmpresa, diasInstituicao, nome }: IGrupos) {
    if (!diasEmpresa.length && !diasInstituicao.length) {
      throw new Error("Grupo precisa ter dias na empresa ou na instituição");
    }

    if (dataFim && dataFim < dataInicio) {
      throw new Error("Data fim não pode ser menor que a data de início");
    }

    const diasInvalidos = [...diasEmpresa, ...diasInstituicao]
      .some(d => d < 0 || d > 6);

    if (diasInvalidos) {
      throw new Error("Dias devem estar entre 0 (domingo) e 6 (sábado)");
    }

    const diasSobrepostos = diasEmpresa
      .some(d => diasInstituicao.includes(d));

    if (diasSobrepostos) {
      throw new Error("Um dia não pode ser empresa e instituição ao mesmo tempo");
    }

    const grupo = new Grupo({
      nome,
      diasEmpresa,
      diasInstituicao,
      dataInicio,
      dataFim
    })

    await this.grupoRepository.create(grupo)
  }
}