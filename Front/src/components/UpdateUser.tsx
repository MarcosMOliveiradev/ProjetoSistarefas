import type { userDTO } from "@/dtos/userDto"
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { useQuery } from "@tanstack/react-query"
import { findUserId } from "@/api/findUserId"
import { useEffect } from "react"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { api } from "@/lib/axios"
import { findUserGrupo } from "@/api/findUserGrup"
import type { gruposDTO } from "@/dtos/gruposDTO"

type UpdateUserProps = {
  id: string
  onSuccess: () => void
}

// TODO: Corrigir retorno de data de criação do grupo

const updateUserProps = z.object({
  name: z.string().min(1),
  matricula: z.number().min(1),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  ativado: z.boolean(),
  grupoName: z.string().optional(),
  inicio: z.string().optional()
}).refine(
  (data) => {
    // Se nenhum dos dois foi preenchido, está ok
    if (!data.password && !data.confirmPassword) return true

    // Se um foi preenchido, ambos devem existir e ser iguais
    return data.password === data.confirmPassword
  },
  {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  }
)

  export function UpdateUser({ id, onSuccess }: UpdateUserProps) {
    const { data: user } = useQuery<userDTO>({
      queryKey: ['user', id],
      queryFn: () => findUserId(id),
      enabled: !!id
    })

    const { data: grupo } = useQuery<gruposDTO>({
      queryKey: ['grupo', id],
      queryFn: () => findUserGrupo(id),
      enabled: !!id
    })

  const form = useForm<z.infer<typeof updateUserProps>>({
    resolver: zodResolver(updateUserProps),
    defaultValues: {
      name: "",
      password: undefined,
      confirmPassword: undefined,
      ativado: true,
    },
  })

  async function updateUser(dados: z.infer<typeof updateUserProps>) {
    try {
      await api.post('/user/updateuser', {
        id: id,
        name: dados.name,
        password: dados.password,
        ativado: dados.ativado
      })

      toast.success('Usuario atualizado')
      onSuccess()
      window.location.reload()
    } catch (err) {
      toast.error('Erro ao atualizar o usuario')
    }
  }

  useEffect(() => {
    if(user && grupo) {
      form.reset({
        name: user.user.name,
        matricula: user.user.matricula,
        password: undefined,
        confirmPassword: undefined,
        ativado: user.user.ativado,
        grupoName: grupo.props.nome,
        inicio: grupo.props.dataInicio
      })
    }
  }, [id, user, grupo, form])

  async function desvincularGrupo() {
    try {
      const dataFim = new Date()

      await api.post('/grupos/encerrarvinculo', {
        userId: id,
        dataFim: dataFim,
      })

      toast.success("Grupo desvinculado com sucesso")
      onSuccess()
      window.location.reload()
    } catch (err) {
      toast.error("Erro ao desvincular grupo")
    }
  }

  return (
    <DialogContent>
       <DialogHeader>
        <DialogTitle className="font-bold font-sans text-[1.5rem]">Atualizar Usuario</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form className="grid grid-cols-2 gap-4" onSubmit={form.handleSubmit(updateUser)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field}) => (
              <FormItem className="col-span-2">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="Nome" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="ativado"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status do usuário</FormLabel>

                <Select
                  value={field.value ? "true" : "false"}
                  onValueChange={(value) => field.onChange(value === "true")}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="true">ATIVADO</SelectItem>
                    <SelectItem value="false">DESATIVADO</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            name="matricula"
            control={form.control}
            render={({ field}) => (
              <FormItem>
                <FormLabel>Matricula</FormLabel>
                <FormControl>
                  <Input id="matricula" placeholder="Matricula" disabled {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field}) => (
              <FormItem >
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input id="password" type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field}) => (
              <FormItem >
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input id="confirmPassword" type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="grupoName"
            control={form.control}
            render={({ field}) => (
              <FormItem>
                <FormLabel>Grupo vinculado</FormLabel>
                <FormControl>
                  <Input id="grupoName" placeholder="Grupo" disabled {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="inicio"
            control={form.control}
            render={({ field}) => (
              <FormItem>
                <FormLabel>Inicio no grupo</FormLabel>
                <FormControl>
                  <Input id="inicio" placeholder="Inicio no grupo" disabled {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid col-span-2 gap-2 justify-end">
            <Button className="w-[10rem] cursor-pointer bg-slate-700 hover:bg-slate-400" type="submit">SALVAR</Button>
            <Button className="w-[10rem] cursor-pointer bg-red-950 hover:bg-slate-400" type="button" onClick={desvincularGrupo}>DESVINCULAR GRUPO</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}