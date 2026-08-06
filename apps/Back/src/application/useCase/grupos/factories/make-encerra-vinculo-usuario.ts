import { UserGrupoDrizzleRepository } from "../../../../database/table/UserGrupoRepository.ts";
import { EncerrarVinculoUsuarioGrupo } from "../EncerrarVinculoUsuario.ts";

export function makeEncerraVinculoUsuario() {
  const userGrupoRepository = new UserGrupoDrizzleRepository()
  const encerraVinculo = new EncerrarVinculoUsuarioGrupo(userGrupoRepository)

  return encerraVinculo
}