export class FormatoHoraErrado extends Error{
  constructor() {
    super('Formato inválido. Use "HH:MM".')
  }
}