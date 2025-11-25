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
import { useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"


const dataPickerSchema = z.object({
    dataInicial: z.date(),
})

export function DataPicker({ onDadosTarefas }: any) {
    const { user } = useAuth()
    const form = useForm<z.infer<typeof dataPickerSchema>>({
        resolver: zodResolver(dataPickerSchema),
        defaultValues: {
            dataInicial: new Date(),
        }
    })

    async function onSubmit(data: z.infer<typeof dataPickerSchema>) {
        const dataB = new Date(data.dataInicial).toLocaleDateString('pt-BR')
        try {
            const tarefas = await api.post('/tarefas/listaTarefas', {dataB})

            onDadosTarefas(tarefas.data.tarefas)
        } catch (err) {
           const isAppError = err instanceof AppErrors
           const title = isAppError ? err.message : "Não foi possivel carregar as informações, por favor informe ao administrador!" 

           toast.error(title)
        }
    }

    async function geraPDF(data: z.infer<typeof dataPickerSchema>) {
        const dataB = new Date(data.dataInicial).toLocaleDateString("pt-BR");
        
        try {
            const response = await api.post(
            "/tarefas/gerarPdf",
            { dataB },
            { responseType: "blob" }
            );
            
            const pdfBlob = new Blob([response.data], { type: "application/pdf" });

            const fileURL = URL.createObjectURL(pdfBlob);

            const link = document.createElement("a");
            link.href = fileURL;
            link.download = `${user.user.name}-${dataB}.pdf`;
            link.click();

            URL.revokeObjectURL(fileURL);
        } catch (err) {
            console.error("Erro ao gerar PDF:", err);
        }
    }

    useEffect(() => {
        const hoje = {
            dataInicial: new Date()
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
                        name="dataInicial"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl className="bg-muted hover:bg-gray-800 hover:text-amber-50">
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[8rem] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                { format(field.value, "dd/MM/yyyy") }
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-muted text-muted-foreground" align="start">
                                        <Calendar
                                            mode="single"
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
                    <Button className="hover:bg-muted w-[8rem] hover:text-muted-foreground hover:border-muted-foreground hover:border-2 bg-cyan-700 cursor-pointer" type="submit">Filtrar</Button>
                    <Button className="cursor-pointer w-[8rem] bg-slate-700 hover:bg-slate-400" onClick={() => geraPDF({dataInicial: form.getValues("dataInicial")})}>GERAR PDF</Button>
                </form>
            </Form>
        </div>
    )
}