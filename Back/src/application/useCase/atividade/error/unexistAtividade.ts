export class UnexistAtividade extends Error{
  constructor() {
    super("Atividade não inexistente")
  }
}