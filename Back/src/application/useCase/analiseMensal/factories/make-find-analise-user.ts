import { AnaliseMensalDrizzleRepository } from "../../../../database/table/AnaliseMensalDrizzleRepository.ts";
import { PresencaDrizzleRepository } from "../../../../database/table/PresencaDrizzleRepository.ts";
import { findAnaliseForUser } from "../findAnaliseForUser.ts";

export function makeFindAnaliseUser() {
  const analiseRepository = new AnaliseMensalDrizzleRepository()
  const presencaRepositoy = new PresencaDrizzleRepository()
  const findAnaliseUser = new findAnaliseForUser(analiseRepository, presencaRepositoy)

  return findAnaliseUser
}