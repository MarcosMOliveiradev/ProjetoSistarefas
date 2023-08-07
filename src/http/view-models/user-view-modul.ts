import { User } from '../../application/entites/users/user'

export class UserView {
  static toHTTP(user: User) {
    return {
      id: user.id,
      nome: user.nome,
      matricula: user.matricula,
      password: user.password,
      permissao: user.permissao,
    }
  }
}
