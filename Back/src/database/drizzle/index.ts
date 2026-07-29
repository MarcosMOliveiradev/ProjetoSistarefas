import { atividade, atividadesRelations } from './atividades.ts'
import { feedback, statusOption } from './feedback.ts'
import { categoryEnum, media, mediaRelations } from './media.ts'
import { mediaRoles } from './media_roles.ts'
import { RolesEnum } from './roles.ts'
import { tarefas, tarefasRelations } from './tarefas.ts'
import { user, userRelations } from './user.ts'
import { userRoles } from './user_roles.ts'
import { origemPresencaEnum, seloEnum, statusPresencaEnum, tipoEsperadoEnum, turnoEnum } from './enums.ts'
import { grupos } from './grupos.ts'
import { userGrupos } from './user_grupo.ts'
import { presenca } from './presenca.ts'
import { analisesMensais } from './analiseMensal.ts'
import { kanban, kanbanStatusEnum } from './kanbanAtividades.ts'
import { kanbanColaboradores } from './kanbanColaboradores.ts'

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
    feedback,
    turnoEnum,
    tipoEsperadoEnum,
    statusPresencaEnum,
    origemPresencaEnum,
    seloEnum,
    grupos,
    userGrupos,
    presenca,
    analisesMensais,
    kanban,
    kanbanColaboradores,
    kanbanStatusEnum
}