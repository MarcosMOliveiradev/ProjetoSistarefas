export class UserAlreadyExistError extends Error{
  constructor() {
    super("Usuario já cadastrado")
  }
}