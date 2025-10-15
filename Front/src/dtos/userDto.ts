export type userDTO = {
    user: {
        id: string
        name: string;
        matricula: number;
        avatarUrl: string | null | undefined;
        ativado: boolean;
        createdAt: Date;
        updatedAt?: Date | null;
    },
    user_role: {
        role: string,
        userId: string
    }
}