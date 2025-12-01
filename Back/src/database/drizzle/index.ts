import { atividade, atividadesRelations } from './atividades.ts'
import { feedback, statusOption } from './feedback.ts'
import { categoryEnum, media, mediaRelations } from './media.ts'
import { mediaRoles } from './media_roles.ts'
import { RolesEnum } from './roles.ts'
import { tarefas, tarefasRelations } from './tarefas.ts'
import { user, userRelations } from './user.ts'
import { userRoles } from './user_roles.ts'

export const schema = {
    user,
    media,
    mediaRoles,
    userRoles,
    categoryEnum,
    RolesEnum,
    userRelations,
    mediaRelations,
    tarefas,
    tarefasRelations,
    atividade,
    atividadesRelations,
    statusOption,
    feedback
}