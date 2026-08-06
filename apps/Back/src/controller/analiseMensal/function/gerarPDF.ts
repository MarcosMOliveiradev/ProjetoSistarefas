import PdfPrinter from "pdfmake"
import type { TDocumentDefinitions } from "pdfmake/interfaces.js"
import { textoPorSelo } from "./textoPorSelo.ts"
import { getImagemSelo } from "./getImage.ts"
import { imageToBase64 } from "./converterImg.ts"

export function gerarPdfAnaliseDesempenho({
  usuario,
  analise,
}: {
  usuario: {
    name: string
    matricula: number
  }
  analise: any
}) {

  const seloImagem = getImagemSelo(analise.selo)

  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  }

  const printer = new PdfPrinter(fonts)

  const docDefinition: TDocumentDefinitions = {
    images: {
      selo: seloImagem,
    },
    defaultStyle: {
      font: "Helvetica",
    },
    content: [
      {
        columns: [
          {
            image: "selo",
            alignment: "right",
          },
        ],
        margin: [0, 0, 0, 20],
      },

      {
        text: "Avaliação de Participação no programa Jovem Aprendiz",
        bold: true,
        alignment: 'center'
      },
      "\n\n",
      {
        text: `Ao Jovem aprendiz ${usuario.name}. Matrícula: ${usuario.matricula}`,
        alignment: 'justify'
      },
      "\n\n",
      {
        text: `Prezado colaborador.
        \n
        Este documento tem como objetivo informar o resultado da análise feita sobre desempenho e participação das atividades dos jovens aprendizes, tanto em nossa empresa, como também na instituição de ensino (SENAC).
        \n
        Após análise realizada das informações recebidas pelo SENAC e pelo nosso departamento pessoal, constatamos que você está agindo com comprometimento em relação as atividades realizadas no programa jovem aprendiz e desejamos que continue se empenhando para melhorar ainda mais.
        \n
        A política do nosso programa consiste em disciplina, pontualidade e compromisso na realização das tarefas e atividades propostas pela nossa empresa e pelo SENAC.
        \n
        A análise foi realizada, baseada no período ${analise.mes}/${analise.ano}. Segue abaixo as informações coletadas:`,
        alignment: 'justify'
      },
      "\n\n",
      { text: "01. Participação geral:", bold: true },
      "\n",
      {
        ul: [
          `Você frenquêntou ${analise.diasCumpridosEmpresa} de um total de ${analise.diasEsperadosEmpresa} espedados na empresa, e ficou com um percentual de frenquência ${analise.percentualEmpresa}%`,
          `Você frenquêntou ${analise.percentualIntituicao} de um total de ${analise.diasEsperadosInstituicao} espedados na instituição, e ficou com um percentual de frenquência ${analise.percentualIntituicao}%`,
          `Teve um total de  ${analise.diasEsperadosEmpresa - analise.diasCumpridosEmpresa} faltas na empresa e
          um total de ${analise.diasEsperadosInstituicao - analise.percentualIntituicao} faltas na instituição`,
          `Tece ${analise.atrasos} Atrasos`,
        ],
      },
      "\n\n",
      { text: "02. Quais pontos precisam ser ajustados?", bold: true },
      "\n",
      { text: `Classificamos sua participação global no programa como ${analise.selo === "DOURADO" 
        ? "ÓTIMO" : analise.selo === "VERDE" ? "BOM" : "INSUFICIENTE"}. ${textoPorSelo(analise.selo)}`, alignment: 'justify'},
      "\n\n",
      { text: "03. Orientações finais", bold: true },
      "\n",
      { text: `Vale ressaltar que o não cumprimento das solicitações e tarefas proposta pela empresa, como também a persistência na prática de faltas e atrasos não justificados poderá ocasionar em ações disciplinares, como advertência, suspensão e até mesmo desligamento da empresa.` },
      "\n",
      { text: "Atenciosamente," },
      "\n",
      { text: "W Engenharia Ltda – Programa Jovem Aprendiz", alignment: 'justify'},

      "\n",
      { text: "Atenciosamente,", alignment: 'center'},
      "\n",
      { text: "Ciente: _______________________________________________ Data: ___ /___ /_____.", alignment: 'center'},

      "\n",
      { 
        text: 'Observação: O jovem aprendiz não poderá ter menos que 75% de participação global na Unidade Curricular e frequência em todas as atividades da empresa e do SENAC.', 
        alignment: 'justify',
        bold: true
      },

      "\n",
      { 
        text: '"As pessoas são contratadas por suas habilidades técnicas, mas são demitidas pelos seus comportamentos. " Peter Drucker', 
        alignment: 'left'
      },
    ],
  }

  const pdfDoc = printer.createPdfKitDocument(docDefinition)

  return new Promise<Buffer>((resolve) => {
    const chunks: any[] = []

    pdfDoc.on("data", (chunk) => chunks.push(chunk))
    pdfDoc.on("end", () => resolve(Buffer.concat(chunks)))

    pdfDoc.end()
  })
}