import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CreatedActivy } from '../../../application/use-cases/activy/Create-activy'
import { TaskRepository } from '../../../application/repositories/tasks/task-repository'

export class CreatedActivyController {
  constructor(
    private createdActivy: CreatedActivy,
    private taskRepository: TaskRepository,
  ) {
    Promise<void>
  }

  async activy(request: FastifyRequest, reply: FastifyReply) {
    const activySchema = z.object({
      index: z.number(),
      idDocumento: z.string().optional(),
      quantidadeFolhas: z.string().optional(),
      horaInicio: z.string(),
      horaTermino: z.string(),
      data: z.string(),
      codigoTarefa: z.number(),
    }) // Define o tipo das entradas

    const {
      index,
      idDocumento,
      quantidadeFolhas,
      horaInicio,
      horaTermino,
      data,
      codigoTarefa,
    } = activySchema.parse(request.body) // Resgata do corpo da requisição as informações

    const idTarefa = await this.taskRepository.id(codigoTarefa)

    await this.createdActivy.create({
      index_atividade_tarefa: index,
      id_documento: idDocumento,
      quantidade_de_folha: quantidadeFolhas,
      hora_inicio: horaInicio,
      hora_termino: horaTermino,
      data,

      usuario: request.user.sub,
      task: idTarefa,
    })

    return reply.status(201).send('Criado com sucesso')
  }
}
