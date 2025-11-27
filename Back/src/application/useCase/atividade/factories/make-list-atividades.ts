import { AtividadeDrizzleRepository } from "../../../../database/table/AtividadeDrizzleRepository.ts";
import { ListAtividades } from "../listAtividades.ts";

export function makeListAtividades() {
  const repositories = new AtividadeDrizzleRepository()
  const listAtividades = new ListAtividades(repositories)

  return listAtividades
}