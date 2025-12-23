import { pgTable, unique, check, text, integer, boolean, timestamp, foreignKey, doublePrecision, index, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const categoryEnum = pgEnum("category_enum", ['COMPRAS', 'ALMOXARIFADO', 'SECRETARIA', 'FINANCEIRO', 'DP', 'INFORMATICA', 'PONTO', 'SEMAC', 'SEMAL', 'PCM', 'PJA', 'OUTROS'])
export const roles = pgEnum("roles", ['TODOS', 'ALMOXARIFADO', 'COMPRAS', 'SECRETARIA', 'FINANCEIRO', 'DP', 'INFORMATICA', 'PONTO', 'SEMAC', 'SEMAL', 'PCM', 'PJA', 'OUTROS'])
export const statusOption = pgEnum("status_option", ['ANALIZANDO', 'EM ANDAMENTO', 'CONCLUIDO', 'CANCELADO'])


export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	matricula: integer().notNull(),
	password: text().notNull(),
	avatarUrl: text("avatar_url"),
	ativado: boolean().default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("user_matricula_unique").on(table.matricula),
	check("user_id_not_null", sql`NOT NULL id`),
	check("user_name_not_null", sql`NOT NULL name`),
	check("user_matricula_not_null", sql`NOT NULL matricula`),
	check("user_password_not_null", sql`NOT NULL password`),
	check("user_ativado_not_null", sql`NOT NULL ativado`),
	check("user_created_at_not_null", sql`NOT NULL created_at`),
	check("user_updated_at_not_null", sql`NOT NULL updated_at`),
]);

export const media = pgTable("media", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	customerId: text("customer_id").notNull(),
	category: categoryEnum().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [user.id],
			name: "media_customer_id_user_id_fk"
		}).onDelete("cascade"),
	check("media_id_not_null", sql`NOT NULL id`),
	check("media_name_not_null", sql`NOT NULL name`),
	check("media_customer_id_not_null", sql`NOT NULL customer_id`),
	check("media_category_not_null", sql`NOT NULL category`),
	check("media_created_at_not_null", sql`NOT NULL created_at`),
	check("media_updated_at_not_null", sql`NOT NULL updated_at`),
]);

export const atividade = pgTable("Atividade", {
	codAtividade: integer("cod_atividade").primaryKey().notNull(),
	setor: text().notNull(),
	descricao: text().notNull(),
	tempoMedio: doublePrecision("tempo_medio").default(60).notNull(),
	usuario: text(),
	ativado: boolean().default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.usuario],
			foreignColumns: [user.id],
			name: "Atividade_usuario_user_id_fk"
		}),
	check("Atividade_cod_atividade_not_null", sql`NOT NULL cod_atividade`),
	check("Atividade_setor_not_null", sql`NOT NULL setor`),
	check("Atividade_descricao_not_null", sql`NOT NULL descricao`),
	check("Atividade_tempo_medio_not_null", sql`NOT NULL tempo_medio`),
	check("Atividade_ativado_not_null", sql`NOT NULL ativado`),
]);

export const tarefas = pgTable("tarefas", {
	id: text().primaryKey().notNull(),
	data: text().notNull(),
	item: integer().notNull(),
	codAtividade: integer("cod_atividade"),
	qtdFolha: integer("qtd_folha").notNull(),
	hInicio: integer("h_inicio").notNull(),
	hTermino: integer("h_termino").notNull(),
	ativado: boolean().default(true).notNull(),
	usuario: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	nAtendimento: integer("n_atendimento").notNull(),
	idDocumento: text("id_documento").default('0').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.codAtividade],
			foreignColumns: [atividade.codAtividade],
			name: "tarefas_cod_atividade_Atividade_cod_atividade_fk"
		}),
	foreignKey({
			columns: [table.usuario],
			foreignColumns: [user.id],
			name: "tarefas_usuario_user_id_fk"
		}).onDelete("cascade"),
	check("tarefas_id_not_null", sql`NOT NULL id`),
	check("tarefas_data_not_null", sql`NOT NULL data`),
	check("tarefas_item_not_null", sql`NOT NULL item`),
	check("tarefas_qtd_folha_not_null", sql`NOT NULL qtd_folha`),
	check("tarefas_h_inicio_not_null", sql`NOT NULL h_inicio`),
	check("tarefas_h_termino_not_null", sql`NOT NULL h_termino`),
	check("tarefas_ativado_not_null", sql`NOT NULL ativado`),
	check("tarefas_created_at_not_null", sql`NOT NULL created_at`),
	check("tarefas_n_atendimento_not_null", sql`NOT NULL n_atendimento`),
	check("tarefas_id_documento_not_null", sql`NOT NULL id_documento`),
]);

export const feedback = pgTable("feedback", {
	id: text().primaryKey().notNull(),
	conteudo: text().notNull(),
	status: statusOption().default('ANALIZANDO'),
	nome: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	check("feedback_id_not_null", sql`NOT NULL id`),
	check("feedback_conteudo_not_null", sql`NOT NULL conteudo`),
	check("feedback_created_at_not_null", sql`NOT NULL created_at`),
	check("feedback_updated_at_not_null", sql`NOT NULL updated_at`),
]);

export const mediaRoles = pgTable("media_roles", {
	mediaId: text("media_id").notNull(),
	role: roles().notNull(),
}, (table) => [
	index("media_roles_role_idx").using("btree", table.role.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.mediaId],
			foreignColumns: [media.id],
			name: "media_roles_media_id_media_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.role, table.mediaId], name: "media_roles_media_id_role_pk"}),
	check("media_roles_media_id_not_null", sql`NOT NULL media_id`),
	check("media_roles_role_not_null", sql`NOT NULL role`),
]);

export const userRoles = pgTable("user_roles", {
	userId: text("user_id").notNull(),
	role: roles().notNull(),
}, (table) => [
	index("user_roles_role_idx").using("btree", table.role.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "user_roles_user_id_user_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.userId, table.role], name: "user_roles_user_id_role_pk"}),
	check("user_roles_user_id_not_null", sql`NOT NULL user_id`),
	check("user_roles_role_not_null", sql`NOT NULL role`),
]);
