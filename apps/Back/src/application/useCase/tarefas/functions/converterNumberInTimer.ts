import { FormatoHoraErrado } from "../error/formatoHoraErrado.ts";

export async function converterNumberInTimer(minutosTotais: number) {
  if(isNaN(minutosTotais) || minutosTotais < 0) {
    return new FormatoHoraErrado()
  }

  const horas = Math.floor(minutosTotais / 60)
  const minutos = minutosTotais % 60

  const horasStr = String(horas).padStart(2, '0')
  const minutosStr = String(minutos).padStart(2, '0')

  return `${horasStr}:${minutosStr}`
}