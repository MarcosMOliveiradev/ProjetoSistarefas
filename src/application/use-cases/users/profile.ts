import { UserRepository } from "src/application/repositories/user/user-repository";
interface IProfile {
    matricula: number
}
export class profile {
    constructor(private userRepository: UserRepository) {
        Promise<void>
    }

    async execut(request: IProfile) {
        try {
            const user = this.userRepository.findUnique(request.matricula)

            return user
        } catch (error) {
            throw new Error('Usuario não existe')
        }
    }
}