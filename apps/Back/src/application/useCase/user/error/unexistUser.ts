export class UnexistUser extends Error{
  constructor() {
    super("Usuario não inexistente")
  }
}