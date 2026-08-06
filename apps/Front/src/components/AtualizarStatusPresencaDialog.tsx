import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { useState } from "react"
import { toast } from "sonner"
import type { presecaDTOS } from "@/dtos/presencaDTOS"

interface Props {
  presenca: presecaDTOS
  onClose: () => void
}

export function AtualizarStatusPresencaDialog({ presenca, onClose }: Props) {
  const [status, setStatus] = useState(presenca.status)
  const queryClient = useQueryClient()

  const atualizarStatus = useMutation({
    mutationFn: async () => {
      await api.patch(`/grupos/updatestatus`, {
        presencaId: presenca.id,
        status,
      })
    },
    onSuccess: () => {
      toast.success("Status atualizado com sucesso")
      queryClient.invalidateQueries({ queryKey: ["presencas"] })
      onClose()
    },
  })

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Atualizar status da presença</DialogHeader>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDENTE">PENDENTE</SelectItem>
            <SelectItem value="PRESENTE">PRESENTE</SelectItem>
            <SelectItem value="ATRASADO">ATRASADO</SelectItem>
            <SelectItem value="FALTA">FALTA</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={() => atualizarStatus.mutate()}
          disabled={status === presenca.status}
        >
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  )
}
