import { AtualizarStatusPresencaDialog } from "@/components/AtualizarStatusPresencaDialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [presencas, setPresencas] = useState<presecaDTOS[]>([])
  const [presencaSelecionada, setPresencaSelecionada] =
    useState<presecaDTOS | null>(null)

  const form = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
  })

  async function findStatus({ status }: z.infer<typeof statusSchema>) {
    const { data } = await api.post<presecaDTOS[]>(
      "/grupos/findbystatus",
      { status }
    )

    setPresencas(data)
  }

  return (
    <div className="m-10 h-[80%]">
      <Helmet title="Presenças" />

      <h2 className="text-xl font-semibold mb-6">
        Gerenciamento de Presenças
      </h2>

      {/* FORM FILTRO */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(findStatus)}
          className="w-[20rem] flex flex-col gap-4 mb-6"
        >
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
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

          <Button type="submit">Buscar</Button>
        </form>
      </Form>

      {/* TABELA */}
      <ScrollArea className="h-[60%] border rounded">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Usuário</TableHead>
              <TableHead className="text-center">Matrícula</TableHead>
              <TableHead className="text-center">Data</TableHead>
              <TableHead className="text-center">Tipo</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Hora Entrada</TableHead>
              <TableHead className="text-center">Origem</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {presencas.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Nenhuma presença encontrada
                </TableCell>
              </TableRow>
            )}

            {presencas.map((dados) => (
              <TableRow
                key={dados.id}
                className="text-center"
              >
                <TableCell>{dados.usuario}</TableCell>
                <TableCell>{dados.matricula}</TableCell>
                <TableCell>{dados.data}</TableCell>
                <TableCell>{dados.tipoEsperado}</TableCell>
                <TableCell>{dados.status}</TableCell>
                <TableCell>
                  {dados.horaEntrada ?? "—"}
                </TableCell>
                <TableCell>{dados.origem}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPresencaSelecionada(dados)}
                  >
                    Alterar status
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* DIALOG */}
      {presencaSelecionada && (
        <AtualizarStatusPresencaDialog
          presenca={presencaSelecionada}
          onClose={() => setPresencaSelecionada(null)}
        />
      )}
    </div>
  )
}