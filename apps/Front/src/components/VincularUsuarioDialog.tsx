import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { useQuery, useMutation } from "@tanstack/react-query"
import { findUser } from "@/api/findUser"
import { api } from "@/lib/axios"
import { Button } from "./ui/button"
import { useState } from "react"
import { toast } from "sonner"

interface Props {
  grupoId: string
  onClose: () => void
}

export function VincularUsuarioDialog({ grupoId, onClose }: Props) {
  const { data: usuarios } = useQuery({
    queryKey: ["usuarios"],
    queryFn: findUser,
  })

  const [userId, setUserId] = useState<string>("")
  const [dataInicio, setDataInicio] = useState("")

  const vincularUsuario = useMutation({
    mutationFn: async () => {
      await api.post("/grupos/vincular", {
        userId,
        grupoId,
        dataInicio,
      })
    },
    onSuccess: () => {
      toast.success("Usuario vinculado")
      onClose()

    },
  })

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Vincular usuário ao grupo</DialogHeader>

        {/* Select de usuários */}
        <select
          className="w-full border p-2 rounded"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Selecione um usuário</option>
          {usuarios?.map((u: any) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Data início */}
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />

        <Button
          onClick={() => vincularUsuario.mutate()}
          disabled={!userId || !dataInicio}
        >
          Vincular
        </Button>
      </DialogContent>
    </Dialog>
  )
}