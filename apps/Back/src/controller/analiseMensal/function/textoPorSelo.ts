export function textoPorSelo(selo: string) {
  switch (selo) {
    case "DOURADO":
      return `Classificamos sua participação global no programa como ÓTIMO, pois constatamos que você não teve faltas nem atrasos relevantes. Continue mantendo o comprometimento.`
    case "VERDE":
      return `Classificamos sua participação como BOA, porém alguns pontos precisam de atenção, como atrasos ou faltas pontuais.`
    case "REGULAR":
      return `Sua participação foi considerada REGULAR. É necessário melhorar frequência, pontualidade e comprometimento.`
    default:
      return `Sua participação está abaixo do esperado e requer ajustes imediatos.`
  }
}