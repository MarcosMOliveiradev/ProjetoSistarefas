import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

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
} from "@/components/ui/form"
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
const criarAtividadeSchema = z.object({
    data: z.date(),
    item: z.string(),
    codAtividade: z.string(),
    idDocumento: z.string(),
    qtdFolhas: z.string(),
    inicio: z.string(),
    termino: z.string(),
    nAtendimento: z.string(),
})

export function CriarAtividadeButton() {
    
    const form = useForm<z.infer<typeof criarAtividadeSchema>>({
        resolver: zodResolver(criarAtividadeSchema),
        defaultValues: {
            data: new Date()
        }
    })

    function onSubmit(dados: z.infer<typeof criarAtividadeSchema>) {
        const data = dados.data.toLocaleDateString('pt-BR')
        console.log({data})
    }

    return (
        <DialogContent className="flex flex-col bg-gray-900 min-w-[50rem] content-center text-gray-300">
            <DialogHeader>
                <DialogTitle>Criar Nova Atividade</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form className="grid grid-cols-4 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                    
                    <FormField
                        control={form.control}
                        name="data"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data Inicial</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl className="bg-gray-900 hover:bg-gray-800 hover:text-amber-50">
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                { format(field.value, "dd/MM/yyyy") }
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-gray-900 text-amber-50" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
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
                        name="qtdFolhas"
                        control={form.control}
                        render={({ field}) => (
                            <FormItem>
                                <FormLabel>Quantidade de folhas</FormLabel>
                                <FormControl>
                                    <Input id="qtdFolhas" placeholder="Quantidade de folhas" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="inicio"
                        control={form.control}
                        render={({ field}) => (
                            <FormItem>
                                <FormLabel>H. Ínicio</FormLabel>
                                <FormControl>
                                    <Input id="inicio" placeholder="H. Ínicio" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="termino"
                        control={form.control}
                        render={({ field}) => (
                            <FormItem>
                                <FormLabel>H. Término</FormLabel>
                                <FormControl>
                                    <Input id="termino" placeholder="H. Término" {...field} />
                                </FormControl>
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

                    <Button className="grid col-start-2 col-span-2 bg-gray-600" type="submit">SALVAR</Button>
                </form>
            </Form>
        </DialogContent>
    )
}