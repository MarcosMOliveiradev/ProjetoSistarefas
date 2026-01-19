import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJwt } from "../../lib/verify-jwt.ts";
import z from "zod";
import { createGruposCroller } from "./createGruposController.ts";
import { findGruposController } from "./findGruposController.ts";
import { userForGrupController } from "./userForGrupController.ts";
import { origemPresencaEnum, statusPresencaEnum } from "../../application/entities/Roles.ts";
import { createPresencaController } from "./createPresencaController.ts";
import { findPresencaForDateController } from "./findPresencaForDateController.ts";
import { findPresencaByStatusController } from "./findPresecaByStatusController.ts";
import { registraEntradaPresencaController } from "./registraEntradaPresencaController.ts";
import { encerraVinculoUsuarioController } from "./encerraVinculoUsuarioController.ts";
import { trocarVinculoUsuarioController } from "./trocarVinculoUsarionController.ts";
import { findPresencaUserController } from "./findPresencaUserController.ts";
import { updateStatusController } from "./updateStatusController.ts";
import { findPresencaByPeriodController } from "./findPresencaByPeriodController.ts";
import { findUserGrupController } from "./findUserGrupController.ts";

export async function routesGrupos(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/create', {
         onRequest: [verifyJwt],
         schema: {
            tags: ['Grupos'],
            summary: 'Cria o grupo',
            body: z.object({
                nome: z.string(),
                diasEmpresa: z.array(z.number().int().min(0).max(6)),
                diasInstituicao: z.array(z.number().int().min(0).max(6)),
                dataInicio: z.coerce.date(),
                dataFim: z.coerce.date().optional()
            })
         }
    }, async (request, reply) => {
        return createGruposCroller(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().get('/find', {
         onRequest: [verifyJwt],
         schema: {
            tags: ['Grupos'],
            summary: 'Lista os grupos',
         }
    }, async (request, reply) => {
        return findGruposController(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().post('/vincular', {
         onRequest: [verifyJwt],
         schema: {
            tags: ['Grupos'],
            summary: 'VIncular usuario a grupo',
            body: z.object({
                userId: z.string(),
                grupoId: z.string(),
                dataInicio: z.coerce.date(),
                dataFim: z.coerce.date().optional()
            })
         }
    }, async (request, reply) => {
        return userForGrupController(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().post('/createpresenca', {
         onRequest: [verifyJwt],
         schema: {
            tags: ['Grupos'],
            summary: 'Cria presença do usuario',
            body: z.object({
                userId: z.string(),
                data: z.coerce.date(),
                origem: z.enum(origemPresencaEnum)
            })
         }
    }, async (request, reply) => {
        return createPresencaController(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().post('/findfordate', {
        onRequest: [verifyJwt],
        schema: {
            tags: ['Grupos'],
            summary: 'Lista a presença de um usario apartir de uma data',
            body: z.object({
                date: z.coerce.date(),
            })
        }
    }, async (request, reply) => {
        return findPresencaForDateController(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().post('/findbystatus', {
        onRequest: [verifyJwt],
        schema: {
            tags: ['Grupos'],
            summary: 'Lista a presença por status',
            body: z.object({
                status: z.enum(statusPresencaEnum),
            })
        }
    }, async (request, reply) => {
        return findPresencaByStatusController(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().post('/registrar', {
    onRequest: [verifyJwt],
    schema: {
        tags: ['Grupos'],
        summary: 'Registra a presenca e a hora',
        body: z.object({
            presencaId: z.string(),
            horaEntrada: z.string()
        })
    }
    }, async (request, reply) => {
        return registraEntradaPresencaController(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().post('/encerrarvinculo', {
    onRequest: [verifyJwt],
    schema: {
        tags: ['Grupos'],
        summary: 'Registra a presenca e a hora',
        body: z.object({
            userId: z.string(),
            dataFim: z.coerce.date()
        })
    }
    }, async (request, reply) => {
        return encerraVinculoUsuarioController(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().post('/trocarvinculo', {
    onRequest: [verifyJwt],
    schema: {
        tags: ['Grupos'],
        summary: 'Registra a presenca e a hora',
        body: z.object({
            userId: z.string(),
            novoGrupoId: z.string(),
            dataInicio: z.coerce.date()
        })
    }
    }, async (request, reply) => {
        return trocarVinculoUsuarioController(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().get('/presencauser', {
    onRequest: [verifyJwt],
    schema: {
        tags: ['Grupos'],
        summary: 'Lista o historico de presenca do usuario',
    }
    }, async (request, reply) => {
        return findPresencaUserController(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().patch('/updatestatus', {
    onRequest: [verifyJwt],
    schema: {
        tags: ['Grupos'],
        summary: 'Atualiza status do usuario',
        body: z.object({
            presencaId: z.string(),
            status: z.enum(statusPresencaEnum)
        })
    }
    }, async (request, reply) => {
        return updateStatusController(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().post('/findbyperiod', {
    onRequest: [verifyJwt],
    schema: {
        tags: ['Grupos'],
        summary: 'Busca presenças por período',
        body: z.object({
            userId: z.string(),
            inicio: z.coerce.date(),
            fim: z.coerce.date()
        })
    }
    }, async (request, reply) => {
        return findPresencaByPeriodController(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().get('/find/:id', {
    onRequest: [verifyJwt],
    schema: {
        tags: ['Grupos'],
        summary: 'Busca grupo do usuario',
    }
    }, async (request, reply) => {
        return findUserGrupController(request, reply)
    })
}