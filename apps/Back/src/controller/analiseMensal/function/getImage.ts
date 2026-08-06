import { imageToBase64 } from "./converterImg.ts"

export function getImagemSelo(selo: string) {
  switch (selo) {
    case "DOURADO":
      return imageToBase64("OTIMO.png")

    case "BOM":
    case "REGULAR":
      return imageToBase64("selo-verde.png")

    case "VERDE":
      return imageToBase64("BOM.png")

    default:
      return imageToBase64("INSUFICIENTE.png")
  }
}