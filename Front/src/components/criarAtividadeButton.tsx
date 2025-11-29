import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns"

import { 
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input";
import { AppErrors } from "@/lib/appErrors";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { useEffect } from "react";

function getHoraAtual() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    return `${horas}:${minutos}`;
}

const criarAtividadeSchema = z.object({
    data: z.date(),
    item: z.string(),
    codAtividade: z.string(),
    idDocumento: z.string(),
    qtdFolha: z.string(),
    hInicioController: z.string(),
    hTerminoController: z.string(),
    nAtendimento: z.string(),
}).refine((data) => {
    const hoje = format(new Date(), "yyyy-MM-dd")
    const dataSelecionada = format(data.data, "yyyy-MM-dd")

    if(dataSelecionada !== hoje) {
        return true
    }

    const horaTermino = data.hTerminoController
    const horaAtual = getHoraAtual()

    if (horaTermino > horaAtual ) {
        return false
    }
    return true
}, {
    message: "A H. Termino não poder ser maior que a hora atual.",
    path: ["hTerminoController"]
}).refine((data) => {
    const dataSelecionada = new Date(data.data.toDateString())
    const hoje = new Date(new Date().toDateString())

    return dataSelecionada <= hoje
}, {
    message: "A data não pode ser superior á data de hoje.",
    path: ["data"]
})

export function CriarAtividadeButton() {

    const form = useForm<z.infer<typeof criarAtividadeSchema>>({
        resolver: zodResolver(criarAtividadeSchema),
        defaultValues: {
            data: new Date()
        }
    })

    useEffect(() => {
        function handleShortcut(e: KeyboardEvent) {
            // Só ativa se o atalho for Ctrl + ;
            if (!(e.ctrlKey && e.key === ";")) return;

            const active = document.activeElement;

            // Só funciona se estiver dentro de um input
            if (!active || active.tagName !== "INPUT") return;

            e.preventDefault();

            const agora = new Date();
            const horas = String(agora.getHours()).padStart(2, "0");
            const minutos = String(agora.getMinutes()).padStart(2, "0");
            const horaAtual = `${horas}:${minutos}`;

            // Descobre qual campo está focado
            const name = active.getAttribute("name");

            if (!name) return;

            // Preenche somente o campo focado
            form.setValue(name as any, horaAtual);

            // Valida o campo automaticamente
            form.trigger(name as any);
        }

        document.addEventListener("keydown", handleShortcut);
        return () => document.removeEventListener("keydown", handleShortcut);
    }, [form]);

    async function onSubmit(dados: z.infer<typeof criarAtividadeSchema>) {
        const dataB = new Date(dados.data).toLocaleDateString("pt-BR");
      
        try {
            const response = await api.post('/tarefas/create', {
                data: dataB,
                item: parseInt(dados.item),
                codAtividade: parseInt(dados.codAtividade),
                idDocumento: dados.idDocumento,
                qtdFolha: parseInt(dados.qtdFolha),
                hInicioController: dados.hInicioController,
                hTerminoController: dados.hTerminoController,
                nAtendimento: parseInt(dados.nAtendimento)
            })

            if(response.status === 201) {
                window.location.reload()
            }
        } catch (err) {
            const isAppError = err instanceof AppErrors
            const title = isAppError ? err.message : "Não foi possivel carregar as informações, por favor informe ao administrador!" 

            toast.error(title)
        }
    }

    return (
        <DialogContent className="flex flex-col bg-muted min-w-[35rem] md:min-w-[45rem] md:h-[20rem] gap-10 items-center content-center text-muted-foreground ">
            <DialogHeader>
                <DialogTitle className="font-bold font-sans text-[1.5rem]">Criar Nova Atividade</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form className="grid grid-cols-3 gap-4 md:grid-cols-4" onSubmit={form.handleSubmit(onSubmit)}>
                    
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
                                <FormMessage className="text-center"/>
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
                        <Button className="w-[10rem] bg-slate-700 hover:bg-slate-400" type="submit">SALVAR</Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    )
}