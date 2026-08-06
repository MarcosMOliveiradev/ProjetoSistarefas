import { PresencaDrizzleRepository } from "../../../../database/table/PresencaDrizzleRepository.ts";
import { UserDrizzleRepository } from "../../../../database/table/UserDrizzleRepository.ts";
import { FecharPresencasPendentes } from "../FecharPresencasPendentes.ts";

export function makeFecharPresencasPendentes() {
  const presencaRepository = new PresencaDrizzleRepository()
  const userRepository = new UserDrizzleRepository()
  
  return new FecharPresencasPendentes(
    presencaRepository,
    userRepository
  );
}