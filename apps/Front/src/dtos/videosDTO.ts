export type videos = {
    media: {
        id: string;
        titulo: string;
        description: string | null;
        costumerId: string;
        category: "COMPRAS" | "ALMOXARIFADO" | "SECRETARIA" | "FINANCEIRO" | "DP" | "INFORMATICA" | "PONTO" | "SEMAC" | "SEMAL" | "PCM" | "PJA" | "OUTROS";
        url: string;
        createdAt: Date;
        updatedAt: Date;
    };
    media_roles: {
        mediaId: string;
        role: "COMPRAS" | "ALMOXARIFADO" | "SECRETARIA" | "FINANCEIRO" | "DP" | "INFORMATICA" | "PONTO" | "SEMAC" | "SEMAL" | "PCM" | "PJA" | "OUTROS" | "TODOS";
    };
}