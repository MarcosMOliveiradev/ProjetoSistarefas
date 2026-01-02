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
import { AppErrors } from "@/lib/appErrors";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const criarUsuarioSchema = z.object({
  name: z.string(),
  matriculaInput: z.string(),
  passwordBody: z.string().min(6, "A senha deve ter no minimo 6 caracteres"),
  turno: z.enum(['MANHA', 'TARDE', 'INTEGRAL']),
  confirmPassword: z.string(),
  role: z.enum(['TODOS', 'COMPRAS', 'ALMOXARIFADO', 'SECRETARIA', 'FINANCEIRO', 'DP', 'INFORMATICA', 'PONTO', 'SEMAC', 'SEMAL', 'PCM', 'PJA', 'OUTROS',])
}).refine((data) => data.passwordBody === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
})

export function CriarUsuarioButton() {
    
    const form = useForm<z.infer<typeof criarUsuarioSchema>>({
        resolver: zodResolver(criarUsuarioSchema),
    })

    async function onSubmit(dados: z.infer<typeof criarUsuarioSchema>) {
      const matricula = parseInt(dados.matriculaInput)
        try {
            const response = await api.post('/user/created', {
              name: dados.name,
              matricula: matricula,
              turno: dados.turno,
              passwordBody: dados.passwordBody,
              role: dados.role
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
        <DialogContent className="flex flex-col bg-muted min-w-[50rem] content-center text-muted-foreground">
            <DialogHeader>
                <DialogTitle>Criar novo usuario</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form className="grid grid-cols-4 gap-4 " onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field}) => (
                            <FormItem className="col-span-4">
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input id="nome" placeholder="Jhon Doe" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="role"
                        control={form.control}
                        render={({ field}) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Selecione o tipo de usuario</FormLabel>
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
                                        <SelectItem value="TODOS">TODOS</SelectItem>
                                        <SelectItem value="COMPRAS">COMPRAS</SelectItem>
                                        <SelectItem value="ALMOXARIFADO">ALMOXARIFADO</SelectItem>
                                        <SelectItem value="SECRETARIA">SECRETARIA</SelectItem>
                                        <SelectItem value="FINANCEIRO">FINANCEIRO</SelectItem>
                                        <SelectItem value="DP">DP</SelectItem>
                                        <SelectItem value="INFORMATICA">INFORMATICA</SelectItem>
                                        <SelectItem value="PONTO">PONTO</SelectItem>
                                        <SelectItem value="SEMAC">SEMAC</SelectItem>
                                        <SelectItem value="SEMEL">SEMEL</SelectItem>
                                        <SelectItem value="PCM">PCM</SelectItem>
                                        <SelectItem value="PJA">PJA</SelectItem>
                                        <SelectItem value="OUTROS">OUTROS</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="turno"
                        control={form.control}
                        render={({ field}) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Selecione o turno do usuario</FormLabel>
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
                                        <SelectItem value="MANHA">MANHÃ</SelectItem>
                                        <SelectItem value="TARDE">TARDE</SelectItem>
                                        <SelectItem value="INTEGRAL">INTEGRAL</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="matriculaInput"
                        control={form.control}
                        render={({ field}) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Matricula</FormLabel>
                                <FormControl>
                                    <Input id="matriculaInput" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="passwordBody"
                        control={form.control}
                        render={({ field}) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input id="senha" type="password" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="confirmPassword"
                        control={form.control}
                        render={({ field}) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Confirmar senha</FormLabel>
                                <FormControl>
                                    <Input id="confirmPassword" type="password" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="grid col-start-2 col-span-2 justify-center">
                        <Button className="w-[8rem] bg-slate-700 hover:bg-slate-400" type="submit">SALVAR</Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    )
}