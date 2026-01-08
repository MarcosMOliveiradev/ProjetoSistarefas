import z from "zod";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { format, parse } from "date-fns"
import { Button } from "./ui/button";
import { api } from "@/lib/axios";
import type { tarefasDTO } from "@/dtos/tarefasDTO";
import { useQuery , useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

type UpdateTarefasProps = {
  dados: tarefasDTO
  onSuccess: () => void
}

const updateTarefasSchema = z.object({
  data: z.date(),
  item: z.string().min(1),
  codAtividade: z.string().min(1),
  idDocumento: z.string().min(1),
  qtdFolha: z.string().min(1),
  hInicioController: z.string().min(1),
  hTerminoController: z.string().min(1),
  nAtendimento: z.string().min(1),
})

export function UpdateTarefas({dados, onSuccess}: UpdateTarefasProps) {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof updateTarefasSchema>>({
    resolver: zodResolver(updateTarefasSchema)
  })
  async function getTarefas(id: string) {
    const { data } = await api.get<tarefasDTO>(`/tarefas/find/${id}`)

    return data
  }
  async function updateTarefas(dado: z.infer<typeof updateTarefasSchema>) {
    try {
      await api.patch('/tarefas/update', {
        id: dados.tarefas.id,
        data: new Date(dado.data).toLocaleDateString("pt-BR"),
        item: Number(dado.item),
        codAtividade: Number(dado.codAtividade),
        idDocumento: dado.idDocumento,
        qtdFolha: Number(dado.qtdFolha),
        hInicioController: dado.hInicioController,
        hTerminoController: dado.hTerminoController,
        nAtendimento: Number(dado.nAtendimento),
      })

      // 🔄 atualiza a listagem
      await queryClient.invalidateQueries({
        queryKey: ['tarefas']
      })

      toast.success("Tarefa atualizada com sucesso!")
      onSuccess() // 🔒 fecha o dialog
      window.location.reload()
    } catch {
      toast.error("Erro ao atualizar tarefa")
    }
  }

  const { data: tarefa, isLoading } = useQuery({
    queryKey: ['tarefas', dados.tarefas.id],
    queryFn: () => getTarefas(dados.tarefas.id),
    enabled: !!dados?.tarefas?.id, // 🔥 evita fetch indevido
  })

  useEffect(() => {
  if (tarefa) {
    form.reset({
      data: tarefa.tarefas.data
      ? parse(tarefa.tarefas.data, "dd/MM/yyyy", new Date()) : undefined,
      item: String(tarefa.tarefas.item),
      codAtividade: String(tarefa.tarefas.cod_atividade),
      idDocumento: tarefa.tarefas.id_documento,
      qtdFolha: String(tarefa.tarefas.qtd_folha),
      hInicioController: tarefa.tarefas.h_inicio,
      hTerminoController: tarefa.tarefas.h_termino,
      nAtendimento: String(tarefa.tarefas.n_atendimento),
    })
  }
}, [tarefa, form])


  return (
    <DialogContent className="flex flex-col bg-muted min-w-[35rem] md:min-w-[45rem] md:h-[20rem] gap-10 items-center content-center text-muted-foreground">
      <DialogHeader>
        <DialogTitle className="font-bold font-sans text-[1.5rem]">Atualizar Tarefa</DialogTitle>
      </DialogHeader>
      
      <Form {...form}>
        <form className="grid grid-cols-3 gap-4 md:grid-cols-4" onSubmit={form.handleSubmit(updateTarefas)}>
            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                  <FormItem className="flex flex-col">
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                          <Input
                              type="date"
                              className="w-full bg-muted"
                              value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                              onChange={(e) => {
                                  const dateStr = e.target.value;
                                  const date = dateStr ? new Date(dateStr + "T00:00:00") : undefined;
                                  field.onChange(date);
                              }}
                          />
                      </FormControl>
                  </FormItem>
              )}
            />

            <FormField
              name="item"
              control={form.control}
              render={({ field}) => (
                  <FormItem>
                      <FormLabel>Item</FormLabel>
                      <FormControl>
                          <Input id="item" placeholder="Item" {...field} />
                      </FormControl>
                  </FormItem>
              )}
          />

          <FormField
              name="codAtividade"
              control={form.control}
              render={({ field}) => (
                  <FormItem>
                      <FormLabel>Cód. Atividades</FormLabel>
                      <FormControl>
                          <Input id="codAtividade" placeholder="Cód. Atividades" {...field} />
                      </FormControl>
                  </FormItem>
              )}
          />
          <FormField
              name="idDocumento"
              control={form.control}
              render={({ field}) => (
                  <FormItem>
                      <FormLabel>Id Documento</FormLabel>
                      <FormControl>
                          <Input id="idDocumento" placeholder="Id Documento" {...field} />
                      </FormControl>
                  </FormItem>
              )}
          />

          <FormField
              name="qtdFolha"
              control={form.control}
              render={({ field}) => (
                  <FormItem>
                      <FormLabel>Quantidade de folhas</FormLabel>
                      <FormControl>
                          <Input id="qtdFolha" placeholder="Quantidade de folhas" {...field} />
                      </FormControl>
                  </FormItem>
              )}
          />

          <FormField
              name="hInicioController"
              control={form.control}
              render={({ field}) => (
                  <FormItem>
                      <FormLabel>H. Ínicio</FormLabel>
                      <FormControl>
                          <Input id="hInicioController" placeholder="H. Ínicio" {...field} />
                      </FormControl>
                  </FormItem>
              )}
          />
          <FormField
              name="hTerminoController"
              control={form.control}
              render={({ field}) => (
                  <FormItem>
                      <FormLabel>H. Término</FormLabel>
                      <FormControl>
                          <Input id="hTerminoController" placeholder="H. Término" {...field} />
                      </FormControl>
                      <FormMessage className="text-center"/>
                  </FormItem>
              )}
          />

          <FormField
              name="nAtendimento"
              control={form.control}
              render={({ field}) => (
                  <FormItem>
                      <FormLabel>Nº Atendimento</FormLabel>
                      <FormControl>
                          <Input id="nAtendimento" placeholder="Nº Atendimento" {...field} />
                      </FormControl>
                  </FormItem>
              )}
            />
            <div className="grid col-start-2 col-span-2 md:col-start-3 justify-end">
                <Button className="w-[10rem] bg-slate-700 hover:bg-slate-400 cursor-pointer" type="submit">SALVAR</Button>
            </div>
        </form>
      </Form>
    </DialogContent>
  )
}