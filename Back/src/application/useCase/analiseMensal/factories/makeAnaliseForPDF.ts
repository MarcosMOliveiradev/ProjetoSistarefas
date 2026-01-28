import { AnaliseMensalDrizzleRepository } from "../../../../database/table/AnaliseMensalDrizzleRepository.ts"
import { DadosForPDF } from "../DadosForPDF.ts"

export function makeAnaliseForPdf() {
  const analiseRepository = new AnaliseMensalDrizzleRepository()
  const findAnaliseUser = new DadosForPDF(analiseRepository)

  return findAnaliseUser
}