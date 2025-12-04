import { api } from "@/lib/axios"
import { useState } from "react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Button } from "./ui/button"
import { Eye } from "lucide-react"
import { Spinner } from "./ui/spinner"
import { ScrollArea } from "./ui/scroll-area"

interface DetalhesFeedbackProps {
  id: string
}
export function DetalhesFeedback({ id }: DetalhesFeedbackProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<{nome: string, conteudo: string} | null>(null)

  async function feedbackDetails() {
    setLoading(true)
    try {
      const response = await api.get(`/feedback/list/${id}`)
      setData(response.data)
    } catch (err) {
      toast.error("Feedback não encontrado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state)
        if (state) feedbackDetails()
      }}
    >
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-muted-foreground hover:bg-muted-foreground/30">
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do Feedback</DialogTitle>
        </DialogHeader>
        {loading && (
          <div className="flex justify-center py-6"> <Spinner /></div>
        )}

        {!loading && data && (
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-semibold">Nome:</span>
              <p>{data.nome}</p>
            </div>

            <div>
              <span className="font-semibold">Conteúdo:</span>
              <ScrollArea className="h-[20rem] w-full border rounded-md p-2">
                <p className="whitespace-pre-line">{data.conteudo}</p>
              </ScrollArea>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}