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
    const coutTimeDescription: string[] = []

    activyTime.forEach((objeto: any) => {
      const coutTime: any = {} // cria o objeto para receber os valores
      const id = 'id' // cria uma chave chamada id

      // pega do objeto as informações vindas do baco separadamente
      const inicio = objeto.hora_inicio
      const _id = objeto.id
      const termino = objeto.hora_termino
      const descricao = objeto.Tarefas.descricao
      const nome = objeto.usuario.nome
      const matricula = objeto.usuario.matricula
      const pessoa = 'Nome'
      const registro = 'Matricula'

      // divide a hora inicial em duas partes
      const partesInicial = inicio.split(':')
      const intTimeInicio = partesInicial.map((str) => Number(str)) // passa para um inteiro as duas partes divididas

      // divide a hora final em duas partes
      const partesTermino = termino.split(':')
      const intTimeTermino = partesTermino.map((str) => Number(str)) // passa para um inteiro as duas partes divididas

      // cria uma variavel para receber a hora inicial multiplicada por 60
      const horaInicial = intTimeInicio[0] * 60
      const minutosInicial = intTimeInicio[1] // cria variavel para receber os minutos

      const inicialTotal = horaInicial + minutosInicial // soma as horas e os minutos

      // cria uma variavel para receber a hora inicial multiplicada por 60
      const horaTermino = intTimeTermino[0] * 60
      const minutosTermino = intTimeTermino[1] // cria variavel para receber os minutos

      const terminoTotal = horaTermino + minutosTermino // soma as horas e os minutos

      const tempoTotal = terminoTotal - inicialTotal // diminuir a hora final pela hora inicial

      coutTime[pessoa] = nome
      coutTime[registro] = matricula
      // caso o tempo total retorne horas
      if (tempoTotal > -60) {
        const tellTime = tempoTotal / 60
        const min = tempoTotal % 60
        const hora = parseInt(tellTime)
        coutTime[descricao] = `${hora}:${min}`
        coutTime[id] = _id

        // se as horas tiverem minutus abaixo de 10
        if (min < 10) {
          const hora = parseInt(tellTime)
          coutTime[descricao] = `${hora}:0${min}`
          coutTime[id] = _id
        }
      }

      // caso o tempo total retorne minutos
      if (tempoTotal < 60) {
        coutTime[descricao] = `${'00'}:${tempoTotal}`
        coutTime[id] = _id
      }

      // caso os minutos sejam abaixo de 10
      if (tempoTotal < 10) {
        coutTime[descricao] = `${'00'}:0${tempoTotal}`
        coutTime[id] = _id
      }
      coutTimeDescription.push(coutTime)
    })

    return { coutTimeDescription }
  }
}
