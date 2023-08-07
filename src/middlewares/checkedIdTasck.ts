import { prisma } from '../database/prisma'

// verifica o id de uma tarefa apartir do codigo
export async function checkId(codigoTarefa: number) {
  const idTarefa = await prisma.tarefas.findUnique({
    where: {
      codigo: codigoTarefa,
    },
    select: {
      id: true,
    },
  }) // Verifica o id da tarefa no banco de dados

  if (idTarefa?.id == null) {
    throw new Error('Tarefa invalida!')
  } // Retorna erro caso o codigo seja invalido

  return idTarefa.id
}
