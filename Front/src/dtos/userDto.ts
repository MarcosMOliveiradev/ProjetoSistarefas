export type userDTO = {
    id: string
    name: string;
    matricula: number;
    avatarUrl: string | null | undefined;
    ativado: boolean;
    createdAt: Date;
    updatedAt?: Date | null;
}