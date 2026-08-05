import { Roles } from "../application/entities/Roles.ts";

export type userRoleDTO = {
    user: {
        id: string
        name: string;
        matricula: number;
        avatarUrl: string | null | undefined;
        ativado: boolean;
        turno: "MANHA" | "TARDE" | "INTEGRAL",
        createdAt: Date;
        updatedAt?: Date | null;
    },
    user_roles: {
        role: Roles,
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