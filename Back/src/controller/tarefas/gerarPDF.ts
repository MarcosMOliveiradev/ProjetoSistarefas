import PdfPriter from "pdfmake";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeListTarefas } from "../../application/useCase/tarefas/factories/makeListTarefas.ts";
import type { tarefasDTO } from "../../DTOs/TarefasDTO.ts";
import type { TDocumentDefinitions } from "pdfmake/interfaces.js";

export async function geraPdf(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const dataTarefasSchema = z.object({
    dataB: z.string().optional()
  })

  const usuario = request.user
  
  const { dataB } = dataTarefasSchema.parse(request.body)
  const today = new Date().toLocaleDateString('pt-BR')

  let data

  if(!dataB) {
    data = today
  } else {
    data = dataB
  }

  try {
    const listaTarefas = makeListTarefas()
    const tarefas: tarefasDTO[] = await listaTarefas.exec({ data, userId: usuario.sub })

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      },
    };

    const printer = new PdfPriter(fonts);

    const docDefinition: TDocumentDefinitions = {
      defaultStyle: {
        font: "Helvetica",
        alignment: "center"
      },
      pageOrientation: "landscape",
      content: [
        {text: "W Engenharia", style: "header"},
        "\n",
        {text: `Usuario: ${usuario.name}\n Matricula: ${usuario.matricula}`, alignment: "left"},
        "\n",
        {text: 'Relatório de Produtividade e Execução de Tarefas no Programa Jovem Aprendiz'},
        "\n\n",
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "auto", "auto", "*", "auto", "auto", "auto", "auto", "auto"],
            body: [
              [
                { text: "Data", color: "white", bold: true,},
                { text: "Item", color: "white", bold: true,},
                { text: "Código", color: "white", bold: true,},
                { text: "Setor", color: "white", bold: true,},
                { text: "Descrição", color: "white", bold: true,},
                { text: "Id doc", color: "white", bold: true,},
                { text: "Qtd Folhas", color: "white", bold: true,},
                { text: "Inicio", color: "white", bold: true,},
                { text: "Termino", color: "white", bold: true,},
                { text: "Nº Atend", color: "white", bold: true,}
              ],
              ...tarefas.map(row => [
                row.tarefas.data,
                row.tarefas.item,
                row.tarefas.cod_atividade,
                row.Atividade.setor,
                row.Atividade.descricao,
                row.tarefas.id_documento,
                row.tarefas.qtd_folha,
                row.tarefas.h_inicio,
                row.tarefas.h_termino,
                row.tarefas.n_atendimento
              ])
            ]
          },
          layout: {
            fillColor: (rowIndex) => rowIndex === 0 ? "#0d47a1" : null,

            // Centralização vertical
            paddingTop: () => 6,
            paddingBottom: () => 6,
          }
        },
        {
          text: "",
          pageBreak: "after"
        },
        {
          stack: [
            { text: "Assinatura Digital", alignment: "center", margin: [0, 0, 0, 2] },
            {
              canvas: [
                { type: "rect", x: 0, y: 0, w: 250, h: 60, lineWidth: 1 }
              ]
            }
          ],
          margin: [0, 5, 0, 0]
        }
      ],
      styles: {
        header: { fontSize: 20, bold: true,},
        subheader: { fontSize: 10 }
      }
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinition)

    return new Promise(resolve => {
      const chunks: any[] = [];

      pdfDoc.on("data", chunk => chunks.push(chunk));
      pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));

      pdfDoc.end();
    });

  } catch (err) {
    return reply.status(400).send(err)
  }
}