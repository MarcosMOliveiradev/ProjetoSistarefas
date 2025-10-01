import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

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

const criarAtividadeSchema = z.object({
    data: z.string(),
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
            data: new Date().toLocaleDateString('pt-BR')
        }
    })

    function onSubmit(dados: z.infer<typeof criarAtividadeSchema>) {
        console.log({dados})
    }

    return (
        <DialogContent className="flex flex-col bg-muted min-w-[50rem] content-center text-muted-foreground">
            <DialogHeader>
                <DialogTitle>Criar Nova Atividade</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form className="grid grid-cols-4 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                    
                    <FormField
                        name="data"
                        control={form.control}
                        render={({ field}) => (
                            <FormItem>
                                <FormLabel>Item</FormLabel>
                                <FormControl>
                                    <Input id="data" placeholder="EX: 01/01/2025" {...field} />
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

                    <Button className="grid col-start-2 col-span-2 bg-emerald-900 hover:bg-emerald-700" type="submit">SALVAR</Button>
                </form>
            </Form>
        </DialogContent>
    )
}