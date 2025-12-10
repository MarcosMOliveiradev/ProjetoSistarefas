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

export type Users = {
    id: string;
    name: string;
    matricula: number;
    ativado: boolean;
    avatarUrl: string | null;
    role: "COMPRAS" | "ALMOXARIFADO" | "SECRETARIA" | "FINANCEIRO" | "DP" | "INFORMATICA" | "PONTO" | "SEMAC" | "SEMAL" | "PCM" | "PJA" | "OUTROS" | "TODOS";
}