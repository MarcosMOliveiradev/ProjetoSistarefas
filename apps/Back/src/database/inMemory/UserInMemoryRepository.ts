import { turnoEnum } from "../../application/entities/Roles.ts";
import { User } from "../../application/entities/User.ts";
import { IUpdateUser, UserRepository } from "../../application/repositories/UserRepository.ts";
import type { userDTO } from "../../DTOs/UserDTO.ts";
import { userRoleDTO, Users } from "../../DTOs/UserRoleDTO.ts";

export class InMemoryUserRepository extends UserRepository {
  public items: User[] = []

  async create(data: User): Promise<userDTO> {
    this.items.push(data)

    return {
      id: data.id,
      name: data.name,
      matricula: data.matricula,
      avatarUrl: data.avata,
      ativado: data.ativado,
      createdAt: data.createdAt,
      updatedAt: data.updateAt
    }
  }

  async findById(id: string): Promise<userRoleDTO | null> {
    const user = this.items.find(item => item.id === id)

    if(!user){
      return null
    }

    return this.toUserRoleDTO(user)
  }

  async find(): Promise<Users[]> {
    return this.items
      .filter(user => user.ativado)
      .map(user => ({
        id: user.id,
        name: user.name,
        matricula: user.matricula,
        ativado: user.ativado,
        avatarUrl: user.avata ?? null,
        role: "OUTROS"
      }))
  }

  async findByMatricula(matricula: number) {
    const user = this.items.find(item => item.matricula === matricula)
    
    if(!user){
      return null
    }

    return this.toUserRoleDTO(user)
  }

  async updatePassword(password: string, id: string): Promise<void> {
    const user = this.items.find(item => item.id === id)
    if (user) {
      user.password = password
      user.updateAt = new Date()
    }
  }

  async updateAvataUrl(avatarUrl: string, userId: string): Promise<void> {
    const user = this.items.find(item => item.id === userId)
    if (user) {
      user.avata = avatarUrl
      user.updateAt = new Date()
    }
  }

  async updateTurno(userId: string, turno: turnoEnum): Promise<void> {
    const user = this.items.find(item => item.id === userId)
    if (user) {
      user.turno = turno
      user.updateAt = new Date()
    }
  }

  async updateUser(dados: IUpdateUser): Promise<void> {
    const user = this.items.find(item => item.id === dados.id)
    if (user) {
      if (dados.name !== undefined) user.name = dados.name
      if (dados.password !== undefined) user.password = dados.password
      if (dados.ativado !== undefined) user.ativado = dados.ativado
      user.updateAt = new Date()
    }
  }

  private toUserRoleDTO(user: User): userRoleDTO {
    return {
      user: {
        id: user.id,
        name: user.name,
        matricula: user.matricula,
        turno: user.turno,
        password: user.password,
        avatarUrl: user.avata,
        ativado: user.ativado,
        createdAt: user.createdAt,
        updatedAt: user.updateAt
      },
      user_roles: {
        role: "OUTROS",
        userId: user.id
      }
    } as userRoleDTO
  }
  
}
