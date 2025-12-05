import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listFeedback } from "@/api/listFeedbacks";
import type { FeedbackDTO } from "@/dtos/feedbackDTO";
import { Spinner } from "@/components/ui/spinner";
import { StatusCell } from "@/components/atualizaStatusFeedback";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { userDTO } from "@/dtos/userDto";
import { DetalhesFeedback } from "@/components/detalhesFeedback";


export function FeedbackRelatorio() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setColumnSelection] = useState({})

  const { data: feedback } = useQuery<FeedbackDTO[]>({
    queryKey: ['feedbacks'],
    queryFn: listFeedback,
  })
  const {data: user } = useQuery<userDTO>({
    queryKey: ['profile']
  })

  const queryClient = useQueryClient()

  const updateStatusMutation = useMutation({
    mutationFn: async ({id, status}: {id: string, status: string}) => {
      if(user?.user_roles.role !== 'INFORMATICA') {
        return (
          toast.error('Você não tem permissão para fazer essa alteração')
        )
      }
      return await api.patch('/feedback/updateStatus', {id, status})
    },
    onSuccess: () => {
      toast.success("Status atualizado")
      queryClient.invalidateQueries({queryKey: ['feedbacks']})
    },
    onError: () => {
      toast.error("Não foi possivel atualizar status")
    }
  })

  const columns: ColumnDef<FeedbackDTO>[] = [
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
    cell: ({row}) => <p className="line-clamp-2 text-ellipsis overflow-hidden max-w-[45rem] mx-auto text-center">{row.original.conteudo}</p>
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
    cell: ({ row }) => {
      const status = row.original

      return (
        < StatusCell 
          status={row.getValue("status")}
          onUpdate={async (novoStatus) => updateStatusMutation.mutate({ id: status.id, status: novoStatus })}
        />
      )
    }
  },
  {
    id: "detalhes",
    header: "Detalhes",
    cell: ({ row }) => {
      const item = row.original
      return <DetalhesFeedback id={item.id} />
    }
  }
]

  const table = useReactTable<FeedbackDTO>({
    data: feedback ?? [],
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

        <ScrollArea className="w-[85vw] h-[30rem] bg-white flex rounded-lg shadow-xl/30 ">
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
                    className="h-24"
                  >
                    <Spinner/>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}