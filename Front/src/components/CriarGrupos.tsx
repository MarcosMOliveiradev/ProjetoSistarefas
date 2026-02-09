import z from "zod";
import { DialogContent, DialogHeader } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { format } from "date-fns"
import { Button } from "./ui/button";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { AppErrors } from "@/lib/appErrors";

const diasSemana = [
  { label: "Domingo", value: 0 },
  { label: "Segunda", value: 1 },
  { label: "Terça", value: 2 },
  { label: "Quarta", value: 3 },
  { label: "Quinta", value: 4 },
  { label: "Sexta", value: 5 },
  { label: "Sábado", value: 6 },
]

const criarGruposSchema = z
  .object({
    nome: z.string(),

    diasEmpresa: z.array(z.number().int().min(0).max(6)),
    diasInstituicao: z.array(z.number().int().min(0).max(6)),

    dataInicio: z.date(),
    dataFim: z.date().optional(),
  })
  // ❌ não pode ter sobreposição
  .refine(
    (data) =>
      data.diasEmpresa.every(
        (dia) => !data.diasInstituicao.includes(dia)
      ),
    {
      message: "Um dia não pode ser Empresa e Instituição ao mesmo tempo",
      path: ["diasInstituicao"],
    }
  )
  // ❌ não pode os dois vazios
  .refine(
    (data) =>
      data.diasEmpresa.length > 0 || data.diasInstituicao.length > 0,
    {
      message:
        "O grupo precisa ter pelo menos dias na empresa ou na instituição",
      path: ["diasEmpresa"],
    }
  )
  // ⚠️ se um estiver vazio, o outro precisa ter 5 dias
  .refine(
    (data) => {
      if (data.diasEmpresa.length === 0) {
        return data.diasInstituicao.length === 5
      }

      if (data.diasInstituicao.length === 0) {
        return data.diasEmpresa.length === 5
      }

      return true
    },
    {
      message:
        "Se um tipo não tiver dias, o outro deve conter exatamente 5 dias",
      path: ["diasEmpresa"],
    }
  )

export function CriarGrupos() {
    const form = useForm<z.infer<typeof criarGruposSchema>>({
        resolver: zodResolver(criarGruposSchema),
        defaultValues: {
            diasEmpresa: [],
            diasInstituicao: [],
        },
    })

    async function onSubmit({nome, dataInicio, diasEmpresa, diasInstituicao}: z.infer<typeof criarGruposSchema>) {
        try {
            const { status } = await api.post('/grupos/create', {
                nome,
                diasEmpresa,
                diasInstituicao,
                dataInicio
            })

        if( status === 201 ) {
            toast.success("Grupo Criado")
            window.location.reload()
        }
        } catch (err) {
            const isAppError = err instanceof AppErrors
            const title = isAppError ? err.message : "Não foi possivel carregar as informações, por favor informe ao administrador!" 

            toast.error(title)
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                CÓDIGOS DE ATIVIDADES
            </DialogHeader>

            <Form {...form}>
                <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name="nome"
                        control={form.control}
                        render={({ field}) => (
                            <FormItem className="col-span-4">
                                <FormLabel>Nome do Grupo</FormLabel>
                                <FormControl>
                                    <Input id="nome" placeholder="Grupo Manha 01" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="diasEmpresa"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Dias na Empresa</FormLabel>

                            <div className="grid grid-cols-2 gap-2">
                                {diasSemana.map((dia) => (
                                <label key={dia.value} className="flex items-center gap-2">
                                    <input
                                    type="checkbox"
                                    checked={field.value?.includes(dia.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                        field.onChange([...(field.value ?? []), dia.value])
                                        } else {
                                        field.onChange(
                                            field.value?.filter((v) => v !== dia.value)
                                        )
                                        }
                                    }}
                                    />
                                    {dia.label}
                                </label>
                                ))}
                            </div>

                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="diasInstituicao"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Dias na Instituição</FormLabel>

                            <div className="grid grid-cols-2 gap-2">
                                {diasSemana.map((dia) => (
                                <label key={dia.value} className="flex items-center gap-2">
                                    <input
                                    type="checkbox"
                                    checked={field.value?.includes(dia.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                        field.onChange([...(field.value ?? []), dia.value])
                                        } else {
                                        field.onChange(
                                            field.value?.filter((v) => v !== dia.value)
                                        )
                                        }
                                    }}
                                    />
                                    {dia.label}
                                </label>
                                ))}
                            </div>

                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dataInicio"
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
                                <FormMessage className="text-center"/>
                            </FormItem>
                        )}
                    />

                    <Button className="w-[10rem] bg-slate-700 hover:bg-slate-400" type="submit">ENVIAR</Button>
                </form>
            </Form>
        </DialogContent>
    )
}