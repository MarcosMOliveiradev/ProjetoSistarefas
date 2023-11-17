import { ActivyRepository } from '../../repositories/activy/Activy-repository'

interface ITimeActivyRequest {
  matricula: number
  permission: boolean
}

export class TimeActivy {
  constructor(private activyResponse: ActivyRepository) {
    Promise<void>
  }

  async exec(request: ITimeActivyRequest) {
    const { matricula, permission } = request

    if (!permission) {
      throw new Error('Você não tem permissão')
    }

    const activyTime = await this.activyResponse.count(matricula)

    const coutTime: any = {}

    activyTime.forEach((objeto: any) => {
      const inicio = objeto.hora_inicio
      const termino = objeto.hora_termino
      const descricao = objeto.Tarefas.descricao

      const partesInicial = inicio.split(':')
      const intTimeInicio = partesInicial.map((str) => Number(str))

      const partesTermino = termino.split(':')
      const intTimeTermino = partesTermino.map((str) => Number(str))

      const horaInicial = intTimeInicio[0] * 60
      const minutosInicial = intTimeInicio[1]

      const inicialTotal = horaInicial + minutosInicial

      const horaTermino = intTimeTermino[0] * 60
      const minutosTermino = intTimeTermino[1]

      const terminoTotal = horaTermino + minutosTermino

      const tempoTotal = terminoTotal - inicialTotal

      if (tempoTotal > 60) {
        const horaC = tempoTotal / 60
        const min = tempoTotal % 60
        const hora = parseInt(horaC)
        coutTime[descricao] = `${hora}:${min}`
      }
      if (tempoTotal < 60) {
        coutTime[descricao] = `${'00'}:${tempoTotal}`
      }
    })
    return { coutTime }
  }
}
