import { useAuth } from "@/hooks/useAuth"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"


import profile from "../../assets/PROFILE.png"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CriarUsuarioButton } from "@/components/criarUsuarioButton"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { api } from "@/lib/axios"
import { toast } from "sonner"
import { AppErrors } from "@/lib/appErrors"


const updateSchema = z.object({
  nome: z.string().optional(),
  senha: z.string().optional(),
  confirmSenha: z.string()
}).refine((data) => data.senha === data.confirmSenha, {
  message: "As Senhas não conferem",
  path: ["confirmSenha"],
})

export function Profile() {
  const { user, signOut } = useAuth()

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema)
  })

  const avata = user.user.avatarUrl
  const profileUser = user.user

  async function updateUser(data: z.infer<typeof updateSchema>) {
    if(data.senha) {
      // Chamar API para atualizar nome e senha
      try {
        const response = await api.put("/user/update-password", {
          senha: data.senha
        })


        const title = response.status === 200 ? "Senha atualizada!" : response.data.message

        toast.success(title)

        signOut()

      } catch (err) {

        const isAppError = err instanceof AppErrors
        const title = isAppError ? err.message : "Não foi possivel carregar as informações, por favor informe ao administrador!" 
        
        toast.error(title)

      }
    }
  }
  return (

    <div className="grid grid-cols-[20%_1fr] h-[90vh]">
      <div className="flex flex-col items-center col-[20rem] border-r-2 border-muted-foreground">
        <div className="w-[17rem] h-[19rem] bg-white rounded-lg shadow-xl/30 flex justify-center items-center flex-col gap-4">
          <img src={avata ?? profile} className="w-[10rem] h-[10rem] rounded-[50%] shadow-xl/20" />
          <p className="text-[20px]">{user.user.name}</p>
          <p className="text-[20px]">{user.user.matricula}</p>
        </div>
        {
          user.user_roles.role === "INFORMATICA" ?
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-[17rem] h-[3rem] mt-4 text-[20px] bg-slate-700 hover:bg-slate-400 cursor-pointer">Criar novo usuario</Button>
                </DialogTrigger>
                <DialogContent>
                    <CriarUsuarioButton/>
                </DialogContent>
            </Dialog>
            : <></>
        }
        
      </div>

      <div className="flex flex-col justify-center items-center">
        <Form {...form}>
          <form className="grid grid-cols-2 w-[60vw] h-[50vh] bg-white rounded-lg shadow-xl/10" onSubmit={form.handleSubmit(updateUser)}>
            <div className="col-span-2 h-[5rem] shadow-xl/20 rounded-lg flex flex-col justify-center pl-8 font-semibold text-[2rem]">
              Editar perfil
            </div>
            <div className="col-span-2 mx-8">
              <FormField
                name="nome"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1.5rem]">Nome:</FormLabel>
                    <FormControl>
                      <Input id="nome" placeholder={profileUser.name} {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>

                {/********** Senha ***********/}
            <div className="mx-8">
              <FormField
                name="senha"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1.5rem]">Senha:</FormLabel>
                    <FormControl>
                      <Input id="senha" placeholder="Senha" type="password" {...field}/>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

              {/********** Confirmar Senha ***********/}
            <div className="mx-8">
              <FormField
                name="confirmSenha"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1.5rem]">Confirmar Senha:</FormLabel>
                    <FormControl>
                      <Input id="confirmSenha" placeholder="Confirmar Senha" type="password" {...field}/>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button className="col-span-2 mx-[30%] bg-slate-700 hover:bg-slate-400 h-[3rem] text-[20px]" >Salvar</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}