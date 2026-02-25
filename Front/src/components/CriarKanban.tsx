import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import z from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { toast } from "sonner"

const criarKanbanSchema = z.object({
  titulo: z.string().min(2, "Título deve ter pelo menos 2 caracteres").max(80, "Título muito longo"),
  descricao: z
    .string()
    .min(5, "Descrição deve ter pelo menos 5 caracteres")
    .max(500, "Descrição muito longa"),
  codAtividades: z.coerce
    .number()
    .int("Código deve ser um número inteiro")
    .positive("Código deve ser maior que zero"),
})

type CriarKanbanForm = z.infer<typeof criarKanbanSchema>

type CriarKanbanProps = {
  onSubmit?: (values: CriarKanbanForm) => Promise<void> | void
}

export function CriarKanban({ onSubmit }: CriarKanbanProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof criarKanbanSchema>>({
    resolver: zodResolver(criarKanbanSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      codAtividades: 0,
    },
    mode: "onSubmit",
  })

  const queryClient = useQueryClient();

  const createKanbanMutation = useMutation({
    mutationFn: async (values: CriarKanbanForm) => {
      // se sua API espera exatamente {titulo, descricao, codAtividades}
      const { data } = await api.post("/kanban/create", values);
      return data;
    },
    onSuccess: async () => {
      toast.success("Card criado")
      // recarrega o board
      await queryClient.invalidateQueries({ queryKey: ["kanban"] });
    },

    onError: () => {
      toast.error("Erro ao criar selo")
    },
  });

  async function handleSubmit(values: CriarKanbanForm) {
    try {
      await createKanbanMutation.mutateAsync(values);
      
      form.reset();
      setOpen(false);
    } catch (err: any) {
      // opcional: você pode usar toast aqui
      const message =
        err?.response?.data?.message ?? err?.message ?? "Erro ao criar Kanban";
      console.error(message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-[8rem] cursor-pointer bg-slate-500 hover:bg-slate-400 text-muted">Novo Kanban</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Criar Kanban</DialogTitle>
          <DialogDescription>
            Preencha os campos para criar um novo card no Kanban.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Ajustar tela do Kanban" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="codAtividades"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código da atividade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 102"
                      inputMode="numeric"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Iniciando o kanban digital"
                      className="min-h-[110px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  setOpen(false)
                }}
              >
                Cancelar
              </Button>

              <Button type="submit" disabled={createKanbanMutation.isPending}>
                {createKanbanMutation.isPending ? "Salvando..." : "Criar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}