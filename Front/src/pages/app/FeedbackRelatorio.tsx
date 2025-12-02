import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { listFeedback } from "@/api/listFeedbacks";

const data: Feedback[] = [
  {
    id: "jfkljalfjk",
    nome: "Testa",
    conteudo: "gsafghkjhlfjlsjfçlsjf çlsdfçksç",
    status: "EM ANDAMENTO"
  },
  {
    id: "jfkljalfwwjk",
    nome: "Testa 2",
    conteudo: "gsafghkjhlfjlsjfçlsjf çlsdfçksç",
    status: "CANCELADO"
  }
]

type Feedback = {
  id: string,
  conteudo: string,
  nome: string,
  status: "ANALIZANDO" | "EM ANDAMENTO" | "CONCLUIDO" | "CANCELADO" | null
}

const columns: ColumnDef<Feedback>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "nome",
    header: "Nome",
    cell: ({row}) => (
      <div className="capitalize">{row.getValue("nome")}</div>
    )
  },
  {
    accessorKey: "conteudo",
    header: "Conteudo",
    cell: ({row}) => <div className="">{row.getValue("conteudo")}</div>
  },
  {
    accessorKey: "status",
    header: ({column}) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({row}) => <div className="">{row.getValue("status")}</div>
  }
]

export function FeedbackRelatorio() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setColumnSelection] = useState({})

  const { data: teste } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: listFeedback,
  })

  console.log(teste)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setColumnSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    }
  })

  return (
    <div className="w-[100vw] h-[80vh] flex flex-col justify-center items-center gap-4">
      <Helmet title="Feedback"/>

      <div>
        <div className="font-medium text-[1.5rem] mb-[1rem]">Relatório de feedback</div>

        <div className="w-[85vw] h-[30rem] bg-white flex rounded-lg shadow-xl/30">
          <Table className="text-center">
            <TableHeader>
              {
                table.getHeaderGroups().map((headersGroup) => (
                  <TableRow key={headersGroup.id}>
                    {
                      headersGroup.headers.map((header) => {
                        return (
                          <TableHead className="text-center" key={header.id}>
                            {
                              header.isPlaceholder
                              ? null :
                              flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )
                            }
                          </TableHead>
                        )
                      })
                    }
                  </TableRow>
                ))
              }
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No Results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}