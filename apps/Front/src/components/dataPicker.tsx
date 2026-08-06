import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Calendar } from "./ui/calendar"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { AppErrors } from "@/lib/appErrors"
import { toast } from "sonner"
import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import type { tarefasDTO } from "@/dtos/tarefasDTO"
import { useQuery } from "@tanstack/react-query"


const dataPickerSchema = z.object({
    dateRage: z.object({
        from: z.date(),
        to: z.date()
    }),
})

type DataPickerSchema = z.infer<typeof dataPickerSchema>;

function toBR(d: Date) {
  return d.toLocaleDateString("pt-BR");
}

async function fetchTarefas(from: Date, to: Date) {
  const startDate = toBR(from);
  const endDate = toBR(to);

  if (startDate === endDate) {
    const { data } = await api.post("/tarefas/listaTarefas", { dataB: startDate });
    return data.tarefas;
  }

  const { data } = await api.post("/tarefas/listbyinterval", { startDate, endDate });
  return data.tarefas;
}

export function DataPicker({ onDadosTarefas }: any) {
    const { user } = useAuth()
    const form = useForm<z.infer<typeof dataPickerSchema>>({
        resolver: zodResolver(dataPickerSchema),
        defaultValues: {
            dateRage: {
                from: new Date(),
                to: new Date(),
            },
        }
    })

    const [rangeKey, setRangeKey] = useState(() => {
        const now = new Date();
        return { from: now, to: now };
    });

    const query = useQuery({
        queryKey: ["atividades", toBR(rangeKey.from), toBR(rangeKey.to)],
        queryFn: () => fetchTarefas(rangeKey.from, rangeKey.to),
        staleTime: 0,
    });

    useEffect(() => {
        if (!query.data) return;
        onDadosTarefas(query.data);
    }, [query.data]);

    async function onSubmit(values: DataPickerSchema) {
        setRangeKey(values.dateRage);
    }

    useEffect(() => {
        if (!query.isError) return;
        const err = query.error as any;
        const msg =
        err instanceof AppErrors
            ? err.message
            : err?.response?.data?.message ?? err?.message ?? "Erro ao carregar tarefas";
        toast.error(msg);
    }, [query.isError, query.error])

    async function geraPDF(data: z.infer<typeof dataPickerSchema>) {
        const startDate = new Date(data.dateRage.from).toLocaleDateString("pt-BR");
        const endDate = new Date(data.dateRage.to).toLocaleDateString("pt-BR");
        
        try {
            const response = await api.post(
            "/tarefas/gerarPdf",
            { startDate, endDate },
            { responseType: "blob" }
            );
            
            const pdfBlob = new Blob([response.data], { type: "application/pdf" });

            const fileURL = URL.createObjectURL(pdfBlob);

            const link = document.createElement("a");
            link.href = fileURL;
            link.download = `${user.user.name}-${startDate}.pdf`;
            link.click();

            URL.revokeObjectURL(fileURL);
        } catch (err) {
            console.error("Erro ao gerar PDF:", err);
        }
    }

    useEffect(() => {
        const hoje = {
            dateRage: {
                from: new Date(),
                to: new Date(),
            }
        }
        onSubmit(hoje)
    }, []);

    return (
        <div className="pl-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 items-center ">
                    {/* Data Inicial */}
                    <FormField
                        control={form.control}
                        name="dateRage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl className="bg-muted hover:bg-gray-800 hover:text-amber-50">
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                "w-[14rem] pl-3 text-left font-normal",
                                                !field.value?.from && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value?.from ? (
                                                field.value.to ? (
                                                <>
                                                    {format(field.value.from, "dd/MM/yyyy")} -{" "}
                                                    {format(field.value.to, "dd/MM/yyyy")}
                                                </>
                                                ) : (
                                                format(field.value.from, "dd/MM/yyyy")
                                                )
                                            ) : (
                                                "Selecione o período"
                                            )}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-muted text-muted-foreground" align="start">
                                        <Calendar
                                            mode="range"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Selecione a data.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button 
                        className="hover:bg-muted w-[8rem] hover:text-muted-foreground hover:border-muted-foreground hover:border-2 bg-cyan-700 cursor-pointer" 
                        type="submit"
                        disabled={query.isFetching}
                    >
                        {query.isFetching ? "Carregando..." : "FILTRAR"}
                    </Button>
                    <Button className="cursor-pointer w-[8rem] bg-slate-700 hover:bg-slate-400" onClick={() => geraPDF({dateRage: form.getValues("dateRage")})}>GERAR PDF</Button>
                </form>
            </Form>
        </div>
    )
}