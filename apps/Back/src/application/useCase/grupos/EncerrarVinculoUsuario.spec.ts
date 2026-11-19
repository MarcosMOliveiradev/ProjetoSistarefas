import { describe, expect, it } from 'vitest'
import { EncerrarVinculoUsuarioGrupo } from './EncerrarVinculoUsuario.ts'
import { UserGrupoInMemoryRepository } from '../../../database/inMemory/UserGrupoInMemoryRepository.ts'
import { UserGrupos } from '../../entities/userGrupos.ts'

describe('EncerrarVinculoUsuarioGrupo Use Case', () => {
  it('sets an end date on the active user group link', async () => {
    const repository = new UserGrupoInMemoryRepository(), start = new Date('2026-01-01'), end = new Date('2026-02-01')
    await repository.vincular(new UserGrupos({ userId: 'u1', grupoId: 'g1', dataInicio: start }))
    await new EncerrarVinculoUsuarioGrupo(repository).execute({ userId: 'u1', dataFim: end })
    expect((await repository.findHistoricoDoUsuario('u1'))[0].dataFim).toEqual(end)
  })
})
