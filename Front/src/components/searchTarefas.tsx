import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { api } from "@/lib/axios"
import { toast } from "sonner"
import { AppErrors } from "@/lib/appErrors"

const searchSchema = z.object({
  type: z.enum(["id_documento", "cod_atividade", "n_atendimento", "data"]),
  value: z.string(),
})

export function SearchTarefas({ onDadosTarefas }: any) {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema)
  })

  async function onSubmit(data: z.infer<typeof searchSchema>) {
    try {
      const { data: tarefas } = await api.post('/tarefas/search', {
        type: data.type,
        value: data.value
      })

      onDadosTarefas(tarefas)
    } catch (err) {
      const isAppError = err instanceof AppErrors
      const title = isAppError ? err.message : "Não foi possivel carregar as informações, por favor informe ao administrador!" 

      toast.error(title)
    }
  }

  return (
    <div >
      <Form {...form} >
        <form className="flex gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="value"
            control={form.control}
            render={({ field}) => (
                <FormItem className="col-span-4">
                    <FormControl>
                        <Input id="value" {...field} />
                    </FormControl>
                </FormItem>
            )}
          />

          <FormField
            name="type"
            control={form.control}
            render={({ field}) => (
              <FormItem className="col-span-2">
                  <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                  >
                      <FormControl className="w-full">
                          <SelectTrigger>
                              <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                          <SelectItem value="id_documento">ID DOCUMENTO</SelectItem>
                          <SelectItem value="cod_atividade">COD. ATIVIDADE</SelectItem>
                          <SelectItem value="n_atendimento">Nº ATENDIMENTO</SelectItem>
                      </SelectContent>
                  </Select>
              </FormItem>
            )}
         />

         <Button className="w-[8rem] bg-slate-700 hover:bg-slate-400" type="submit">PESQUISAR</Button>
        </form>
      </Form>
    </div>
  )
}