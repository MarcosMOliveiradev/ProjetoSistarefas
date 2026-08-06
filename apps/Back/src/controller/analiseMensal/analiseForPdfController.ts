import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeAnaliseForPdf } from "../../application/useCase/analiseMensal/factories/makeAnaliseForPDF.ts";
import { makeProfile } from "../../application/useCase/user/factories/make-profile.ts";
import { gerarPdfAnaliseDesempenho } from "./function/gerarPDF.ts";

export async function analiseForPdfController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const dadosSchema = z.object({
    userId: z.string(),
    mes: z.number().min(1).max(12),
    ano: z.number().min(2000),
  })

  const { userId, mes, ano } = dadosSchema.parse(request.body)

  try {
    const findUser = makeProfile()
    const usuario = await findUser.exec({ id: userId })

    if(!usuario) {
      return reply.status(400).send("Usuario não encontrado")
    }

    const analiseForPdf = makeAnaliseForPdf()
    const analise = await analiseForPdf.execute({ userId, mes, ano})

    const pdfBuffer = await gerarPdfAnaliseDesempenho({
      usuario: {
        name: usuario.user.name,
        matricula: usuario.user.matricula,
      },
      analise,
    })

    reply
      .header("Content-Type", "application/pdf")
      .header("Content-Disposition", "attachment; filename=analise.pdf")
      .send(pdfBuffer)
      
  } catch (err) {
   return reply.status(400).send(err)
  }
}