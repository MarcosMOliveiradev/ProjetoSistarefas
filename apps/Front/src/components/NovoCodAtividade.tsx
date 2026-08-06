import { AppErrors } from "@/lib/appErrors"
import { api } from "@/lib/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"


const newCodSchema = z.object({
  cod_atividade: z.string(),
  setor: z.string(),
  descricao: z.string(),
})

interface Props {
  openCod: boolean
  onCloseCod: (v: boolean) => void
}

export function NovoCodAtividade({ openCod, onCloseCod }: Props) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof newCodSchema>>({
    resolver: zodResolver(newCodSchema)
  })

  const criarAtividade = useMutation({
    mutationFn: async (dados: z.infer<typeof newCodSchema>) => {
      const cod_atividade = parseInt(dados.cod_atividade)
      const tempoMedio: number = 10
      await api.post('/atividade/create', {
        setor: dados.setor,
        cod_atividade: cod_atividade,
        descricao: dados.descricao.toUpperCase(),
        tempoMedio: tempoMedio
      })
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["findUser"] })
      onCloseCod(false)
      toast.success("Atividade criada")
    }
  })

  async function onSubmit(dados: z.infer<typeof newCodSchema>) {
    try {
      criarAtividade.mutateAsync(dados)
      form.reset()
    } catch (err) {
      const isAppError = err instanceof AppErrors
      const title = isAppError ? err.message : "Não foi possivel carregar as informações, por favor informe ao administrador!" 

      toast.error(title)
    }
  }

  return (
    <Dialog open={openCod} onOpenChange={onCloseCod}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar novo código de atividade</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid grid-cols-2 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="cod_atividade"
              control={form.control}
              render={({ field}) => (
                <FormItem>
                  <FormLabel>Nome:</FormLabel>
                  <FormControl>
                    <Input id="cod_atividade" placeholder="101" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="setor"
              control={form.control}
              render={({ field}) => (
                <FormItem>
                  <FormLabel>Setor:</FormLabel>
                  <FormControl>
                    <Input id="setor" placeholder="Informática" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="descricao"
              control={form.control}
              render={({ field}) => (
                <FormItem className="col-span-2">
                  <FormLabel>Descrição:</FormLabel>
                  <FormControl>
                    <Textarea id="descricao" placeholder="Manutenção de computador" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid col-start-2 justify-end">
                <Button 
                  className="w-[8rem] bg-slate-700 hover:bg-slate-400 cursor-pointer" 
                  type="submit"
                  disabled={criarAtividade.isPending}
                >
                  {criarAtividade.isPending ? "CRIANDO..." : "CRIAR"}
                </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}