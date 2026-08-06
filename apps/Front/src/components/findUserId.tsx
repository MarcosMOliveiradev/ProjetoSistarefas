import type { tarefasDTO } from "@/dtos/tarefasDTO";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { userDTO } from "@/dtos/userDto";
import { Spinner } from "./ui/spinner";

type FindUserIdProps = {
  dados: tarefasDTO
  onSuccess: () => void
}

export function FindUserId({ dados, onSuccess }: FindUserIdProps) {
  async function getUserId(id: string) {
    const { data } = await api.get(`/user/findid/${dados.tarefas.usuarioId}`)
    return data
  }

  const { data: user } = useQuery<userDTO>({
    queryKey: ['userId', dados.tarefas.usuarioId],
    queryFn: () => getUserId(dados.tarefas.usuarioId),
    enabled: !!dados?.tarefas?.id,
  })

  if(!user) {
    return (
      <Spinner/>
    )
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="font-bold font-sans text-[1.5rem] text-center">Descrição do usuario</DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <div>Data:</div>
          <div className="w-full h-[2rem] flex items-center bg-muted-foreground/40 pl-3 rounded-sm">{dados.tarefas.data}</div>
        </div>

        <div>
          <div>Item:</div>
          <div className="w-full h-[2rem] flex items-center bg-muted-foreground/40 pl-3 rounded-sm">{dados.tarefas.item}</div>
        </div>

        <div>
          <div>Cod Atividade:</div>
          <div className="w-full h-[2rem] flex items-center bg-muted-foreground/40 pl-3 rounded-sm">{dados.tarefas.cod_atividade}</div>
        </div>

        <div className="col-span-3">
          <div>Setor:</div>
          <div className="w-full h-[2rem] flex items-center bg-muted-foreground/40 pl-3 rounded-sm">{dados.Atividade.setor}</div>
        </div>

        <div className="col-span-3">
          <div>Descrição:</div>
          <div className="w-full h-[2rem] flex items-center bg-muted-foreground/40 pl-3 rounded-sm">{dados.Atividade.descricao}</div>
        </div>

        <div>
          <div>Id Documento:</div>
          <div className="w-full h-[2rem] flex items-center bg-muted-foreground/40 pl-3 rounded-sm">{dados.tarefas.id_documento}</div>
        </div>

        <div>
          <div>Inicio:</div>
          <div className="w-full h-[2rem] flex items-center bg-muted-foreground/40 pl-3 rounded-sm">{dados.tarefas.h_inicio}</div>
        </div>

        <div>
          <div>Termino:</div>
          <div className="w-full h-[2rem] flex items-center bg-muted-foreground/40 pl-3 rounded-sm">{dados.tarefas.h_termino}</div>
        </div>

        <div>
          <div>Matricula:</div>
          <div className="w-full h-[2rem] flex items-center bg-muted-foreground/40 pl-3 rounded-sm">{user.user.matricula}</div>
        </div>

        <div className="col-span-2">
          <div>Nome:</div>
          <div className="w-full h-[2rem] flex items-center bg-muted-foreground/40 pl-3 rounded-sm">{user.user.name}</div>
        </div>
      </div>
    </DialogContent>
  )
}