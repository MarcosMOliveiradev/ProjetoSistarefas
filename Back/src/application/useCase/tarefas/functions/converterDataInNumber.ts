import { FormatoHoraErrado } from "../error/formatoHoraErrado.ts"

export async function converterDataInNumber(data: string) {
  // Converte a string do tipo "00:00" em um array de numeros
  const partes = data.split(':').map(Number)

  if (partes.length !== 2 || partes.some(isNaN)) {
    throw new FormatoHoraErrado()
  }

  // Multipica o primeiro indice por 60 para obetr as horas em minutos
  // Faz a soma das horas convertidas em minutos com os minutos no segundo indice
  const [horas, minutos] = partes
  return horas * 60 + minutos
}