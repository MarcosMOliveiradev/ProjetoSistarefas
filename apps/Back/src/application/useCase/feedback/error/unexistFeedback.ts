export class UnexisteFeedback extends Error{
  constructor() {
    super("feedback não inexistente")
  }
}