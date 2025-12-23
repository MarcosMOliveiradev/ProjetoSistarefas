import { relations } from "drizzle-orm/relations";
import { user, media, atividade, tarefas, mediaRoles, userRoles } from "./schema";

export const mediaRelations = relations(media, ({one, many}) => ({
	user: one(user, {
		fields: [media.customerId],
		references: [user.id]
	}),
	mediaRoles: many(mediaRoles),
}));

export const userRelations = relations(user, ({many}) => ({
	media: many(media),
	atividades: many(atividade),
	tarefas: many(tarefas),
	userRoles: many(userRoles),
}));

export const atividadeRelations = relations(atividade, ({one, many}) => ({
	user: one(user, {
		fields: [atividade.usuario],
		references: [user.id]
	}),
	tarefas: many(tarefas),
}));

export const tarefasRelations = relations(tarefas, ({one}) => ({
	atividade: one(atividade, {
		fields: [tarefas.codAtividade],
		references: [atividade.codAtividade]
	}),
	user: one(user, {
		fields: [tarefas.usuario],
		references: [user.id]
	}),
}));

export const mediaRolesRelations = relations(mediaRoles, ({one}) => ({
	media: one(media, {
		fields: [mediaRoles.mediaId],
		references: [media.id]
	}),
}));

export const userRolesRelations = relations(userRoles, ({one}) => ({
	user: one(user, {
		fields: [userRoles.userId],
		references: [user.id]
	}),
}));