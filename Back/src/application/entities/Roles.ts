export enum Roles {
  TODOS = 'TODOS',
  COMPRAS = 'COMPRAS',
  ALMOXARIFADO = 'ALMOXARIFADO',
  SECRETARIA = 'SECRETARIA',
  FINANCEIRO = 'FINANCEIRO',
  DP = 'DP',
  INFORMATICA = 'INFORMATICA',
  PONTO = 'PONTO',
  SEMAC = 'SEMAC',
  SEMAL = 'SEMAL',
  PCM = 'PCM',
  PJA = 'PJA',
  OUTROS = 'OUTROS',
}

export enum turnoEnum {
  MANHA = 'MANHA',
  TARDE = 'TARDE',
  INTEGRAL = 'INTEGRAL'
}

export enum tipoEsperadoEnum  {
  EMPRESA = 'EMPRESA',
  INSTITUICAO = 'INSTITUICAO'
}

export enum statusPresencaEnum  {
  PENDENTE = 'PENDENTE',
  PRESENTE = 'PRESENTE',
  ATRASADO = 'ATRASADO',
  FALTA = 'FALTA'
}

export enum origemPresencaEnum  {
  SISTEMA = 'SISTEMA',
  MANUAL = 'MANUAL'
}

export enum seloEnum  {
  VERDE = 'VERDE',
  VERMELHO = 'VERMELHO',
  DOURADO = 'DOURADO'
}