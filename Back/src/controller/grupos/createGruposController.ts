import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateGrupo } from "../../application/useCase/grupos/factories/make-create-grupos.ts";

export async function createGruposCroller(
    request: FastifyRequest, 
    replay: FastifyReply
) {
    const createGrupoSchema = z.object({
        nome: z.string(),
        diasEmpresa: z.array(z.number().int().min(0).max(6)),
        diasInstituicao: z.array(z.number().int().min(0).max(6)),
        dataInicio: z.coerce.date(),
        dataFim: z.coerce.date().optional()
    })

    const { dataInicio, diasEmpresa, diasInstituicao, nome, dataFim } = createGrupoSchema.parse(request.body)


    try {
        const createGrupo = makeCreateGrupo()
        await createGrupo.execute({
            dataInicio,
            diasEmpresa,
            diasInstituicao,
            nome,
            dataFim
        })

        return replay.status(201).send({message: 'Criado Com sucesso!'})
    } catch (err) {
        return replay.status(400).send({message: err})
    }
}