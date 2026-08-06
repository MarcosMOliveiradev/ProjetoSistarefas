import { pgEnum } from "drizzle-orm/pg-core";

export const turnoEnum = pgEnum("turno", ["MANHA", "TARDE", "INTEGRAL"])

export const tipoEsperadoEnum = pgEnum("tipo_esperado", ["EMPRESA", "INSTITUICAO", "FOLGA", "LIBERACAO"])

export const statusPresencaEnum = pgEnum("status_presenca", ["PENDENTE", "PRESENTE", "ATRASADO", "FALTA"])

export const origemPresencaEnum = pgEnum("origem_presenca", ["SISTEMA", "MANUAL"])

export const seloEnum = pgEnum("selo", ["VERDE", "VERMELHO", "DOURADO"])