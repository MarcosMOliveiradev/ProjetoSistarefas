import { useForm } from "react-hook-form"
import { useState } from "react"
import { Camera } from "lucide-react"
import { toast } from "sonner"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAuth } from "@/hooks/useAuth"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CriarUsuarioButton } from "@/components/criarUsuarioButton"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { api } from "@/lib/axios"
import { AppErrors } from "@/lib/appErrors"

import profile from "../../assets/PROFILE.png"
import { useMutation, useQuery } from "@tanstack/react-query"
import { updateAvatar } from "@/api/updataAvata"
import { getProfile } from "@/api/profile"
import { findUser } from "@/api/findUser"
import type { usersDTO } from "@/dtos/userDto"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UpdateUser } from "@/components/UpdateUser"

const updateSchema = z.object({
  nome: z.string().optional(),
  senha: z.string().optional(),
  confirmSenha: z.string()
}).refine((data) => data.senha === data.confirmSenha, {
  message: "As Senhas não conferem",
  path: ["confirmSenha"],
})

export function Profile() {
  const [usuarioOpen, setUsuarioOpen] = useState(false)

  const { data: user } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const { data: listUsuarios } = useQuery<usersDTO[]>({
    queryKey: ['findUser'],
    queryFn: () => findUser(),
    enabled: user?.user_roles.role === 'INFORMATICA'
  })
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<string | null>(null)

  const nomeSeparado = user?.user.name.split(" ")

  const { signOut } = useAuth()
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema)
  })

  const avata = user?.user.avatarUrl
  const profileUser = user?.user

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

  const avatarMutation = useMutation({
    mutationFn: updateAvatar,
    onSuccess: (data) => {
      setPreview(data)
    }
  })

  function handleUpdateAvata(event: React.ChangeEvent<HTMLInputElement>) {
    setIsUploading(true)
    try {
      const file = event.target.files?.[0]
      if (!file) return;

    const previewURL = URL.createObjectURL(file)
    setPreview(previewURL)

      avatarMutation.mutate(file)
    } catch (err) {
      toast.error("Falha ao enviar imagem")
    } finally {
      setIsUploading(false)
    }
  }

  function getPrimeiroESegundoNome(nomeCompleto: string) {
    if (!nomeCompleto) return ""

    const partes = nomeCompleto.trim().split(/\s+/)

    if (partes.length === 1) return partes[0]

    const conectores = ["de", "do", "da", "dos", "das"]

    if (conectores.includes(partes[1].toLowerCase()) && partes.length >= 3) {
      return `${partes[0]} ${partes[1]} ${partes[2]}`
    }

    return `${partes[0]} ${partes[1]}`
  }

  return (

    <div className="grid grid-cols-[20%_1fr] h-[90vh]">
      <div className="flex flex-col items-center col-[20rem] border-r-2 border-muted-foreground">
        <div className="w-[15rem] h-[18rem] bg-white rounded-lg shadow-xl/30 flex justify-center items-center flex-col gap-2">
        <>
          <label htmlFor="media" className="cursor-pointer flex flex-col items-center">
            <div className="relative w-[8rem] h-[8rem]">
              
              <img
                src={preview || avata || profile}
                className="w-full h-full rounded-full object-cover shadow-xl/20"
              />

              {isUploading && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Camera className="h-4 w-4" />
              Alterar foto
            </div>

            <input
              type="file"
              id="media"
              className="hidden"
              accept="image/*"
              onChange={handleUpdateAvata}
            />
          </label>
        </>
          <p className="text-[20px]">{nomeSeparado ? `${nomeSeparado[0]} ${nomeSeparado[1]}` : "Carregando..."}</p>
          <p className="text-[20px]">{user?.user.matricula}</p>
        </div>
        {
          user?.user_roles.role === "INFORMATICA" ?
            <>
              <Dialog>
                  <DialogTrigger asChild>
                      <Button className="w-[15rem] h-[3rem] mt-4 text-[20px] bg-slate-700 hover:bg-slate-400 cursor-pointer">Criar novo usuario</Button>
                  </DialogTrigger>
                  <DialogContent>
                      <CriarUsuarioButton/>
                  </DialogContent>
              </Dialog>

              <ScrollArea className="h-[20rem] w-[90%] p-4 m-4 rounded-2xl bg-slate-900">
                <h2 className="text-xl font-semibold mb-4">Usuários</h2>
    
                {listUsuarios?.map(u => (
                      <button
                        key={u.id}
                        onClick={() => {
                          setUsuarioSelecionado(u.id)
                          setUsuarioOpen(true)
                        }}
                        className={`w-full cursor-pointer p-2 rounded text-left hover:bg-slate-700 flex items-center gap-2
                          ${usuarioSelecionado === u.id ? "bg-slate-700" : ""}`}
                      >
                        <>
                          <img className="w-8 h-8 rounded-full object-cover" src={u.avatarUrl ?? profile} />
                          {getPrimeiroESegundoNome(u.name)}
                        </>
                      </button>
                  
                ))}
              </ScrollArea>

            </>
            : <></>
        }
        
      </div>
      <Dialog open={usuarioOpen} onOpenChange={setUsuarioOpen}>
        {usuarioSelecionado && (
          <UpdateUser 
            id={usuarioSelecionado}
            onSuccess={() => {
              setUsuarioOpen(false)
              setUsuarioSelecionado(null)
            }}
          ></UpdateUser>
        )}
      </Dialog>

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
                      <Input id="nome" placeholder={profileUser?.name} {...field}/>
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