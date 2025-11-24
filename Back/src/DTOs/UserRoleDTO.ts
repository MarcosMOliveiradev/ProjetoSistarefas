export type userRoleDTO = {
    user: {
        id: string
        name: string;
        matricula: number;
        avatarUrl: string | null | undefined;
        ativado: boolean;
        createdAt: Date;
        updatedAt?: Date | null;
    },
    user_roles: {
        role: string,
        userId: string
    }
}