import { PresencaDrizzleRepository } from "../../../../database/table/PresencaDrizzleRepository.ts";
import { UserDrizzleRepository } from "../../../../database/table/UserDrizzleRepository.ts";
import { RegistrarEntradaPresenca } from "../RegistrarEntradaPresenca.ts";

export function makeRegistraEntradaPresenca() {
  const presencaRepository = new PresencaDrizzleRepository()
  const userRepository = new UserDrizzleRepository()
  const registraEntradaPresenca = new RegistrarEntradaPresenca(presencaRepository, userRepository)

  return registraEntradaPresenca
}