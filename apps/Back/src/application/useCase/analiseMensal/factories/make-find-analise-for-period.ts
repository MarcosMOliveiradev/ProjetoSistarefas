import { AnaliseMensalDrizzleRepository } from "../../../../database/table/AnaliseMensalDrizzleRepository.ts";
import { FindAnaliseForPeriod } from "../FindAnaliseForPeriod.ts";

export function makeFindAnaliseForPeriod() {
  const analiseRepository = new AnaliseMensalDrizzleRepository()
  const findAnaliseForPeriod = new FindAnaliseForPeriod(analiseRepository)

  return findAnaliseForPeriod
}