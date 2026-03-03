import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "./ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { findGrupos } from "@/api/findGrupos";
import { Spinner } from "./ui/spinner";
import type { gruposDTO } from "@/dtos/gruposDTO";
import { Button } from "./ui/button";
import { useState } from "react";
import { VincularUsuarioDialog } from "./VincularUsuarioDialog";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger } from "./ui/alert-dialog";
import { toast } from "sonner";
import { AppErrors } from "@/lib/appErrors";
import { api } from "@/lib/axios";
import { Trash2 } from "lucide-react";

export function TabelaGrupos() {
    const [grupoSelecionado, setGrupoSelecionado] = useState<string | null>(null)
    const [open, setOpen] = useState(false)

    const queryClient = useQueryClient();

    const { data: grupos } = useQuery({
        queryKey: ['grupos'],
        queryFn: findGrupos
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/grupos/delete/${id}`)
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['grupos' ]})
            setOpen(false)
        }
    })

    if(!grupos) {
        return <Spinner/>
    }

    return (
        <ScrollArea className="max-h-[90%]">
            <Table>
                <TableHeader >
                    <TableRow className="w-[60px] text-center text-muted-foreground">
                        <TableHead className="text-center">Nome do Grupo</TableHead>
                        <TableHead className="text-center">Dias na Empresa</TableHead>
                        <TableHead className="text-center">Dias na Instituição</TableHead>
                        <TableHead className="text-center">Data de inicio do grupo</TableHead>
                        <TableHead className="text-center">Data de fim do grupo</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {grupos.map((dados: gruposDTO) => (
                        <TableRow className="text-center" key={dados.id}>
                            <TableCell>{dados.nome}</TableCell>
                            <TableCell>{dados.diasEmpresa.join(", ")}</TableCell>
                            <TableCell>{dados.diasInstituicao.join(", ")}</TableCell>
                            <TableCell>{dados.dataInicio}</TableCell>
                            <TableCell>{dados.dataFim ?? "-"}</TableCell>

                            <TableCell>
                                <Button
                                size="sm"
                                onClick={() => setGrupoSelecionado(dados.id)}
                                >
                                Vincular usuário
                                </Button>
                            </TableCell>
                            <TableCell>
                                <AlertDialog open={open} onOpenChange={setOpen}>
                                    <AlertDialogTrigger asChild>
                                        <Button variant={'ghost'} className="cursor-pointer"><Trash2 className='w-4'/></Button>
                                    </AlertDialogTrigger >
                                    <AlertDialogContent className="flex flex-col gap-4 items-center" >
                                        <AlertDialogHeader className="text-center text-[1.2rem] font-semibold">
                                            Tem certeza que deseja deletar esse grupo
                                        </AlertDialogHeader>
                                        <div className="flex gap-4">
                                            <Button 
                                                className="bg-emerald-700 hover:bg-emerald-600 cursor-pointer"
                                                onClick={() => deleteMutation.mutate(dados.id)}
                                                disabled={deleteMutation.isPending}
                                            >
                                                {deleteMutation.isPending ? "Deletando.." : "Deletar!"}
                                            </Button>
                                            <AlertDialogCancel className="cursor-pointer bg-red-900 text-muted hover:bg-red-700 hover:text-muted">CANCELAR</AlertDialogCancel>
                                        </div>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {grupoSelecionado && (
                <VincularUsuarioDialog
                    grupoId={grupoSelecionado}
                    onClose={() => setGrupoSelecionado(null)}
                />
            )}
        </ScrollArea>
    )
}