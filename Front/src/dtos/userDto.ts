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
    user_roles: {
        role: string,
        userId: string
    }
}

export type usersDTO = {
    id: string;
    name: string;
    matricula: number;
    turno: "MANHA" | "TARDE" | "INTEGRAL" | null;
    ativado: boolean;
    avatarUrl: string | null;
    role: "COMPRAS" | "ALMOXARIFADO" | "SECRETARIA" | "FINANCEIRO" | "DP" | "INFORMATICA" | "PONTO" | "SEMAC" | "SEMAL" | "PCM" | "PJA" | "OUTROS" | "TODOS";
}