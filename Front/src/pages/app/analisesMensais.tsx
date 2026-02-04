import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { analisesDTO } from "@/dtos/analiseDTO"
import type { userDTO } from "@/dtos/userDto"
import { api } from "@/lib/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { PiMedalFill } from "react-icons/pi"
import z from "zod"

const criarSeloSchema = z.object({
  mes: z.coerce.number().min(1).max(12),
  ano: z.coerce.number().min(2024),
})

export function AnalisesMensais() {
  const form = useForm<z.infer<typeof criarSeloSchema>>({
    resolver: zodResolver(criarSeloSchema),
    defaultValues: {
      mes: new Date().getMonth(),
      ano: new Date().getFullYear(),
    },
  })

  const [periodo, setPeriodo] = useState<z.infer<typeof criarSeloSchema>>({
    mes: new Date().getMonth() + 1,
    ano: new Date().getFullYear()
  })

  // Buscar dados do usuário logado
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<userDTO>(['profile'])

  // Definir o userId a ser consultado
  const isInformatica = user?.user_roles.role === "INFORMATICA"

  const { data: analises, isPending } = useQuery<analisesDTO[]>({
      queryKey: [
        "analise",
        periodo.mes,
        periodo.ano
      ],
      queryFn:  async () => {
        const { data } = await api.post("/analise/findAnalises", {
          mes: periodo.mes,
          ano: periodo.ano
        })
        return data
      }
    })

  function onSubmit(data: z.infer<typeof criarSeloSchema>) {
    setPeriodo(data)
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
    <div className="m-10 h-[80%]">
      <Helmet title="Feedback"/>
      {isInformatica && (
        <div className="flex justify-around items-center">
           <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-4"
              >
                {/* MÊS */}
                <FormField
                  name="mes"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mês</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Selecione o mês"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
    
                {/* ANO */}
                <FormField
                  name="ano"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ano</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Selecione o ano"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
    
                {/* BOTÃO */}
                <Button
                  type="submit"
                  className="col-span-2 cursor-pointer"
                  disabled={isPending}
                >
                  {isPending ? "Criando..." : "Salvar"}
                </Button>
              </form>
            </Form>
        </div>
      )}

      <h1>Consultar Selos</h1>
      <ScrollArea className="h-[60%] border rounded">
        <div className="w-full overflow-x-auto">
        <Table className="min-w-[1000px] text-xs sm:text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-xs sm:text-sm">Nome</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Mat</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Mês</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Ano</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Dias esp. E</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Dias cum. E</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Dias esp Inst</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Dias cum Inst</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Atrasos</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">% participação E</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">% participação I</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Selos</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isPending && <Spinner />}
            {analises?.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Nenhuma presença encontrada
                </TableCell>
              </TableRow>
            )}

            {analises?.map((dados) => (
              <TableRow
                key={dados.id}
                className="text-center"
              >
                <TableCell className="text-left ml-4">{getPrimeiroESegundoNome(dados.usuario)}</TableCell>
                <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.matricula}</TableCell>
                <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.mes}</TableCell>
                <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.ano}</TableCell>
                <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.diasEsperadosEmpresa}</TableCell>
                <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.diasCumpridosEmpresa}</TableCell>
                <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.diasEsperadosInstituicao}</TableCell>
                <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.diasCumpridosInstituicao}</TableCell>
                <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.atrasos}</TableCell>
                <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.percentualEmpresa}</TableCell>
                <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.percentualIntituicao}</TableCell>
                <TableCell className={ `flex justify-center gap-4 text-xs sm:text-sm px-2 sm:px-4
                  ${dados.selo === "VERDE" ? ' text-green-800' 
                  : dados.selo === "VERMELHO" ? 'text-red-800' 
                  : dados.selo === "DOURADO" ? 'text-gold' : ''}`
                }>
                  <PiMedalFill  className={`w-[1rem] h-[1rem] m-0
                    ${dados.selo === "VERDE" ? ' text-green-800' 
                    : dados.selo === "VERMELHO" ? 'text-red-800' 
                    : dados.selo === "DOURADO" ? 'text-gold' : ''}`} />
                  {
                    dados.selo
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </ScrollArea>
    </div>
  )
}