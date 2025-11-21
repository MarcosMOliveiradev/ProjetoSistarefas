import { useAuth } from "@/hooks/useAuth"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"


import profile from "../../assets/PROFILE.png"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const updateSchema = z.object({
  nome: z.string(),
  senha: z.string(),
  confirmSenha: z.string()
}).refine((data) => data.senha === data.confirmSenha, {
  message: "As Senhas não conferem",
  path: ["confirmSenha"],
})

export function Profile() {
  const { user } = useAuth()

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema)
  })

  const avata = user.user.avatarUrl
  const profileUser = user.user

  async function updateUser(data: z.infer<typeof updateSchema>) {
    console.log(data)
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
            <Button className="w-[17rem] h-[3rem] mt-4 text-[20px] bg-slate-700 hover:bg-slate-400 cursor-pointer ">Criar Novo Usuario</Button> 
            : <></>
        }
        
      </div>

      <div className="flex flex-col justify-center items-center">
        <Form {...form}>
          <form action="" className="grid grid-cols-2 w-[60vw] h-[50vh] bg-white rounded-lg" onSubmit={form.handleSubmit(updateUser)}>
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

            <Button className="col-span-2 mx-[30%] bg-green-800 hover:bg-green-400 h-[3rem] text-[20px]" >Salvar</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}