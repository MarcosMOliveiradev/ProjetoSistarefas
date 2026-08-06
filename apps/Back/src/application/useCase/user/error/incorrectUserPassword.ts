export class IncorrectUserPassword extends Error{
  constructor() {
    super("Matricula ou senha incorreta")
  }
}