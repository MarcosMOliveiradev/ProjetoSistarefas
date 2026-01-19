import type { Grupo } from "../../../entities/grupo.ts"

interface DiasEsperadosResult {
  diasEmpresa: number
  diasInstituicao: number
  total: number
}

export function calcularDiasEsperados(
  grupo: Grupo,
  mes: number,
  ano: number
): DiasEsperadosResult {
  let diasEmpresa = 0
  let diasInstituicao = 0

  const dataInicial = new Date(ano, mes - 1, 1)
  const dataFinal = new Date(ano, mes, 0)

  for (
    let data = new Date(dataInicial);
    data <= dataFinal;
    data.setDate(data.getDate() + 1)
  ) {
    // Fora do período do grupo
    if (data < grupo.dataInicio) continue
    if (grupo.dataFim && data > grupo.dataFim) continue

    const diaSemana = data.getDay()

    if (grupo.isDiaEmpresa(diaSemana)) {
      diasEmpresa++
    }

    if (grupo.isDiaInstituicao(diaSemana)) {
      diasInstituicao++
    }
  }

  return {
    diasEmpresa,
    diasInstituicao,
    total: diasEmpresa + diasInstituicao,
  }
}