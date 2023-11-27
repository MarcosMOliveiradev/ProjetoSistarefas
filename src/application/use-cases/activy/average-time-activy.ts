import { ActivyRepository } from '../../repositories/activy/Activy-repository'

interface ITimeActivyRequest {
  matricula: number
  permission: boolean
}

export class AverageTimeActivy {
  constructor(private activyResponse: ActivyRepository) {
    Promise<void>
  }

  async exec(request: ITimeActivyRequest) {
    const { matricula, permission } = request

    if (!permission) {
      throw new Error('Você não tem permissão')
    }

    const activyTime = await this.activyResponse.count(matricula)
    const arrayDescicao: any = []
    const arrayTempo: any = []
    const coutTime: any = {} // cria o objeto para receber os valores
    const medias: any = {}

    activyTime.forEach((objeto: any) => {
      // pega do objeto as informações vindas do baco separadamente
      const inicio = objeto.hora_inicio
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

      arrayDescicao.push(descricao)
      arrayTempo.push(tempoTotal)
      medias[pessoa] = nome
      medias[registro] = matricula
    })

    for (let x = 0; x < arrayDescicao.length; x++) {
      const descricaoAtual = arrayDescicao[x]
      const tempoAtual = arrayTempo[x]

      if (!coutTime[descricaoAtual]) {
        coutTime[descricaoAtual] = {
          soma: 0,
          quantidade: 0,
        }
      }
      coutTime[descricaoAtual].quantidade++
      coutTime[descricaoAtual].quantidade++
      coutTime[descricaoAtual].soma += tempoAtual
    }

    for (const string in coutTime) {
      const { soma, quantidade } = coutTime[string]
      const media = soma / quantidade
      if (media < 60) {
        const time = media
        const min = parseInt(time)
        medias[string] = `00:${min}`

        if (min < 10) {
          medias[string] = `00:0${min}`
        }
      }
      if (media > 60) {
        const time = media / 60
        const hora = parseInt(time)
        const tellMin = media % 60
        const min = parseInt(tellMin)
        medias[string] = `${hora}:${min}`

        if (min < 10) {
          medias[string] = `${hora}:0${min}`
        }
      }
    }
    return { medias }
  }
}
