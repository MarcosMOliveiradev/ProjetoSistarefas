export class PasswordIncorrectError extends Error {
  constructor() {
    super(JSON.stringify('A matricula ou a senha está incorreta'))
  }
}
