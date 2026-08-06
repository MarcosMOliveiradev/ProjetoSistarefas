import { AtividadeDrizzleRepository } from "../../../../database/table/AtividadeDrizzleRepository.ts";
import { CreateAtividades } from "../createAtividade.ts";

export function makeCreateAtividade() {
  const repository = new AtividadeDrizzleRepository()
  const atividade = new CreateAtividades(repository)

  return atividade
}