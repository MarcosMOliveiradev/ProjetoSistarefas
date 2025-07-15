import { pgEnum } from "drizzle-orm/pg-core";

// Enum para os setores que podem listar o arquivo
export const RolesEnum = pgEnum(
    "roles", 
    [
        'TODOS', 
        'ALMOXARIFADO', 
        'COMPRAS', 
        'SECRETARIA', 
        'FINANCEIRO', 
        'DP', 
        'TI', 
        'PONTO', 
        'SEMAC', 
        'SEMAL', 
        'PCM', 
        'PJA',
        'OUTROS'
    ]);