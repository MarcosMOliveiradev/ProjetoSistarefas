export class PasswordIncorrectError extends Error {
  constructor() {
    super('A matricula ou a senha está incorreta')
  }
}
