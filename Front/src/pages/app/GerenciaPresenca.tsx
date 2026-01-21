import { AtualizarStatusPresencaDialog } from "@/components/AtualizarStatusPresencaDialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { presecaDTOS } from "@/dtos/presencaDTOS";
import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import z from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const statusSchema = z.object({
  status: z.enum(["PENDENTE", "PRESENTE", "ATRASADO", "FALTA"]),
  dateRage: z.object({
      from: z.date(),
      to: z.date()
  }),
})

export function GerenciaPresenca() {
  const [presencas, setPresencas] = useState<presecaDTOS[]>([])
  const [presencaSelecionada, setPresencaSelecionada] =
    useState<presecaDTOS | null>(null)
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null);

  const form = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
  })

  async function findStatus({ status, dateRage }: z.infer<typeof statusSchema>) {
    const { data } = await api.post<presecaDTOS[]>(
      "/grupos/findbystatus",
      { 
        status,
        inicio: dateRage.from,
        fim: dateRage.to
      }
    )

    setPresencas(data)
  }

  function handleSort(col: string) {
        if (sortCol !== col) {
            // primeira vez clicando → ASC
            setSortCol(col);
            setSortDir("asc");
            return;
        }

        if (sortDir === "asc") {
            // segunda vez → DESC
            setSortDir("desc");
            return;
        }

        if (sortDir === "desc") {
            // terceira vez → remove ordenação
            setSortCol(null);
            setSortDir(null);
            return;
        }
    }

const dadosOrdenados = useMemo(() => {
  if (!sortCol || !sortDir) return [...presencas]

  return [...presencas].sort((a, b) => {
    if (sortCol === "data") {
      const d1 = new Date(a.data).getTime()
      const d2 = new Date(b.data).getTime()

      return sortDir === "asc" ? d1 - d2 : d2 - d1
    }

    return 0
  })
}, [presencas, sortCol, sortDir])

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
          <FormField
                control={form.control}
                name="dateRage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Data</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl className="bg-muted hover:bg-gray-800 hover:text-amber-50">
                                    <Button
                                        variant="outline"
                                        className={cn(
                                        "w-[14rem] pl-3 text-left font-normal",
                                        !field.value?.from && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value?.from ? (
                                        field.value.to ? (
                                        <>
                                            {format(field.value.from, "dd/MM/yyyy")} -{" "}
                                            {format(field.value.to, "dd/MM/yyyy")}
                                        </>
                                        ) : (
                                        format(field.value.from, "dd/MM/yyyy")
                                        )
                                    ) : (
                                        "Selecione o período"
                                    )}
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-muted text-muted-foreground" align="start">
                                <Calendar
                                    mode="range"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                    captionLayout="dropdown"
                                />
                            </PopoverContent>
                        </Popover>
                        <FormDescription>
                            Selecione a data.
                        </FormDescription>
                        <FormMessage />
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
              <TableHead 
                className="text-center cursor-pointer"
                onClick={() => handleSort("data")}
              >Data {sortCol === "data" && (sortDir === "asc" ? "▲" : "▼")} </TableHead>
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

            {dadosOrdenados.map((dados) => (
              <TableRow
                key={dados.id}
                className="text-center"
              >
                <TableCell>{dados.usuario}</TableCell>
                <TableCell>{dados.matricula}</TableCell>
                <TableCell>
                  {format(parseISO(dados.data), "dd/MM/yyyy", { locale: ptBR })}
                </TableCell>
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