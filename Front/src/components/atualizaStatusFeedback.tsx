import { Button } from "@/components/ui/button"
import type { userDTO } from "@/dtos/userDto"
import { useQueryClient } from "@tanstack/react-query"
import { Check, Pencil, X } from "lucide-react"
import { useState } from "react"

type Status = "EM ANDAMENTO" | "CONCLUIDO" | "CANCELADO"

interface StatusCellProps {
  status: Status
  onUpdate: (newStatus: Status) => void
}

export function StatusCell({ status, onUpdate }: StatusCellProps) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(status)

  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<userDTO>(['profile'])

  if (!editing) {
    return (
      <div className="flex items-center justify-center gap-2 ">
        <span className={ `text-muted h-[2rem] rounded-sm w-[8rem] items-center flex justify-center 
                          ${status === "CANCELADO" ? "bg-red-900" 
                                      : status === "CONCLUIDO" ? "bg-emerald-900" 
                                      : status === "EM ANDAMENTO" ? "bg-amber-500" 
                                      : "bg-cyan-900"}`}>{status}</span>
        {user?.user_roles.role !== 'INFORMATICA' ?
          <></> :
          <Button
          className="cursor-pointer"
          size="sm"
          variant="outline"
          onClick={() => setEditing(true)}
        >
          <span className="sr-only">Editar</span>
          <Pencil/>
        </Button>
        }
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="EM ANDAMENTO">EM ANDAMENTO</option>
        <option value="CONCLUIDO">CONCLUIDO</option>
        <option value="CANCELADO">CANCELADO</option>
      </select>

      <Button
        className="cursor-pointer bg-emerald-900 hover:bg-emerald-500"
        size="sm"
        variant="default"
        onClick={() => {
          onUpdate(value)
          setEditing(false)
        }}
      >
        <span className="sr-only">Confirmar</span>
        <Check/>
      </Button>

      <Button
        className="cursor-pointer"
        size="sm"
        variant="destructive"
        onClick={() => {
          setValue(status) // volta ao original
          setEditing(false)
        }}
      >
        <span className="sr-only">Cancela</span>
        <X/>
      </Button>
    </div>
  )
}