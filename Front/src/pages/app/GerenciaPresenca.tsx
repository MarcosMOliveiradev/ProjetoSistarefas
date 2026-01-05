import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { presecaDTOS } from "@/dtos/presencaDTOS";
import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import z from "zod";

const statusSchema = z.object({
  status: z.enum(["PENDENTE", "PRESENTE", "ATRASADO", "FALTA"])
})

export function GerenciaPresenca() {
  const [presenca, setPresenca] = useState<presecaDTOS[]>([])
  const form = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
  })

  async function findStatus({ status }: z.infer<typeof statusSchema>) {
    const { data } = await api.post<presecaDTOS[]>('/grupos/findbystatus', {
      status
    })

    setPresenca(data)
  }

  if(!presenca) {
    return <Spinner />
  }

  return (
    <div className="m-10">
      <Helmet title="Grupos"/>
      <div> 
          <h2>Presenças dos usuarios</h2>
          <div>
            <Form {...form}>
              <form className="w-[20rem] flex gap-4 flex-col" onSubmit={form.handleSubmit(findStatus)}>
                <FormField
                  control={form.control}
                  name={"status"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selecione o status</FormLabel>
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
                          <SelectItem value="PENDENTE">PENDENTE</SelectItem>
                          <SelectItem value="PRESENTE">PRESENTE</SelectItem>
                          <SelectItem value="ATRASADO">ATRASADO</SelectItem>
                          <SelectItem value="FALTA">FALTA</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button type="submit">SELECIONAR</Button>
              </form>
            </Form>
          </div>

          <ScrollArea className="h-[90%]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Usuario</TableHead>
                  <TableHead className="text-center">Matricula</TableHead>
                  <TableHead className="text-center">Data</TableHead>
                  <TableHead className="text-center">Tipo</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Hora de Entrada</TableHead>
                  <TableHead className="text-center">Origem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {presenca.map((dados) => (
                  <TableRow className="text-center" key={dados.id}>
                    <TableCell>{dados.usuario}</TableCell>
                    <TableCell>{dados.matricula}</TableCell>
                    <TableCell>{dados.data}</TableCell>
                    <TableCell>{dados.tipoEsperado}</TableCell>
                    <TableCell>{dados.status}</TableCell>
                    <TableCell>{dados.horaEntrada ? dados.horaEntrada : "Falta"}</TableCell>
                    <TableCell>{dados.origem}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
      </div>
  </div>
  )
}