import { AnaliseMensalDrizzleRepository } from "../../../../database/table/AnaliseMensalDrizzleRepository.ts";
import { CountAnalise } from "../CountAnalise.ts";

export function makeCountAnalise() {
  const analisesMensais = new AnaliseMensalDrizzleRepository()
  const countAnalise = new CountAnalise(analisesMensais)

  return countAnalise
}