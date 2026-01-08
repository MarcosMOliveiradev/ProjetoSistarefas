import { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from './ui/button'
import { FilePenLine, Trash2 } from 'lucide-react'
import type { tarefasDTO } from '@/dtos/tarefasDTO'
import { toast } from "sonner";
import { AppErrors } from "@/lib/appErrors";
import { api } from "@/lib/axios";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger } from "./ui/alert-dialog";
import { Dialog } from "./ui/dialog";
import { UpdateTarefas } from "./updateTarefas";

export function TabelaAtividades({ dados }: any) {
    const [tarefaSelecionada, setTarefaSelecionada] = useState<tarefasDTO | null>(null)
    const [openUpdate, setOpenUpdate] = useState(false)
    // filtro de ordenação
    const [sortCol, setSortCol] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null);

    // fecha dialog
    const [open, setOpen] = useState(false);

    // paginação
    const [pagina, setPagina] = useState(1);
    const registrosPorPagina = 10;

    // manipula o clique na coluna para ordenar
    function handleSort(col: string) {
        setPagina(1);
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

    // ordena os dados conforme a coluna e direção selecionada
    const dadosOrdenados = useMemo(() => {
        const copia = [...dados];

        if (!sortCol || !sortDir) {
            return copia;
        }

        return copia.sort((a, b) => {
            let v1, v2;

            switch (sortCol) {

            case "item":
                v1 = a.tarefas.item;
                v2 = b.tarefas.item;
                break;

            case "descricao":
                v1 = a.Atividade.descricao;
                v2 = b.Atividade.descricao;
                return sortDir === "asc"
                ? v1.localeCompare(v2)
                : v2.localeCompare(v1);

            case "codAtividade":
                v1 = a.tarefas.cod_atividade;
                v2 = b.tarefas.cod_atividade;
                break;

            default:
                return 0;
            }

            return sortDir === "asc" ? v1 - v2 : v2 - v1;
        });
    }, [dados, sortCol, sortDir]);

    // conta quantos item tem para fazer a paginação
    const totalPaginas = Math.ceil(dadosOrdenados.length / registrosPorPagina);

    // pega os dados da página atual para criar os botões de paginação
    const dadosPaginados = useMemo(() => {
        const inicio = (pagina - 1) * registrosPorPagina;
        const fim = inicio + registrosPorPagina;
        return dadosOrdenados.slice(inicio, fim);
    }, [dadosOrdenados, pagina]);

    async function handleDelete(id: string) {
        try {
            const response = await api.post('/tarefas/deletar', {
                id,
                ativado: false
            })

            const title = response.status === 200 ? response.data.message : "Atividade deletada"

            toast.success(title)
            setOpen(false)
            window.location.reload()

        } catch (err) {
            const isAppError = err instanceof AppErrors
            const title = isAppError ? err.message : "Não foi possivel carregar as informações, por favor informe ao administrador!" 

            toast.error(title)
        }
    }

    return (
        <div className='m-4 max-w-full text-muted-foreground'>
            <ScrollArea>
                <div className="h-[40rem]">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[30px] text-sm text-center text-muted-foreground">DATA</TableHead>
                                <TableHead
                                    className="w-[30px] text-sm text-center cursor-pointer"
                                    onClick={() => handleSort("item")}
                                    >
                                    ITEM {sortCol === "item" && (sortDir === "asc" ? "▲" : "▼")}
                                </TableHead>
                                <TableHead
                                    className="w-[60px] text-sm text-center cursor-pointer"
                                    onClick={() => handleSort("codAtividade")}
                                    >
                                    CÓd. ATIVIDADE {sortCol === "codAtividade" && (sortDir === "asc" ? "▲" : "▼")}
                                </TableHead>
                                <TableHead className="text-center text-sm text-muted-foreground">SETOR</TableHead>
                                <TableHead
                                    className="text-center cursor-pointer"
                                    onClick={() => handleSort("descricao")}
                                    >
                                    DESCRIÇÃO {sortCol === "descricao" && (sortDir === "asc" ? "▲" : "▼")}
                                </TableHead>
                                <TableHead className="w-[60px] text-sm text-center text-muted-foreground">ID DOCUMENTO</TableHead>
                                <TableHead className="w-[60px] text-sm text-center text-muted-foreground">QTD FOLHAS</TableHead>
                                <TableHead className="w-[60px] text-sm text-center text-muted-foreground">INICIO</TableHead>
                                <TableHead className="w-[60px] text-sm text-center text-muted-foreground">TERMINO</TableHead>
                                <TableHead className="w-[60px] text-sm text-center text-muted-foreground">Nº ATENTIMENTO</TableHead>
                                <TableHead className="w-[10px] text-sm text-center text-muted-foreground">APAGAR</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-sm w-[30px]">
                            {
                                dadosPaginados.map((dado: tarefasDTO) => (
                                    <TableRow className='text-center' key={dado.tarefas.id}>
                                        <TableCell className="text-sm w-[30px]">{dado.tarefas.data}</TableCell>
                                        <TableCell className="text-sm w-[30px]">{dado.tarefas.item}</TableCell>
                                        <TableCell className="text-sm w-[30px]">{dado.tarefas.cod_atividade}</TableCell>
                                        <TableCell className="text-sm">{dado.Atividade.setor}</TableCell>
                                        <TableCell className="text-sm">{dado.Atividade.descricao}</TableCell>
                                        <TableCell className="text-sm w-[30px]">{dado.tarefas.id_documento}</TableCell>
                                        <TableCell className="text-sm w-[30px]">{dado.tarefas.qtd_folha}</TableCell>
                                        <TableCell className="text-sm w-[30px]">{dado.tarefas.h_inicio}</TableCell>
                                        <TableCell className="text-sm w-[30px]">{dado.tarefas.h_termino}</TableCell>
                                        <TableCell className="text-sm w-[30px]">{dado.tarefas.n_atendimento}</TableCell>
                                        <TableCell className="text-sm w-[20px]">
                                            <AlertDialog open={open} onOpenChange={setOpen}>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant={'ghost'} className="cursor-pointer"><Trash2 className='w-4'/></Button>
                                                </AlertDialogTrigger >
                                                <AlertDialogContent className="flex flex-col gap-4 items-center" >
                                                    <AlertDialogHeader className="text-center text-[1.2rem] font-semibold">
                                                        Tem certeza que deseja deletar a atividade?
                                                    </AlertDialogHeader>
                                                    <div className="flex gap-4">
                                                        <Button 
                                                            className="bg-emerald-700 hover:bg-emerald-600 cursor-pointer"
                                                            onClick={() => handleDelete(dado.tarefas.id)}
                                                        >
                                                            DELETAR!
                                                        </Button>
                                                        <AlertDialogCancel className="cursor-pointer bg-red-900 text-muted hover:bg-red-700 hover:text-muted">CANCELAR</AlertDialogCancel>
                                                    </div>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                        <TableCell className="text-[12px] w-[30px]">
                                            <Button 
                                                variant={'ghost'}
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    setTarefaSelecionada(dado)
                                                    setOpenUpdate(true)
                                                }}
                                            >
                                                <FilePenLine />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                            <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
                                {tarefaSelecionada && (
                                    <UpdateTarefas 
                                        dados={tarefaSelecionada}
                                        onSuccess={() => {
                                            setOpen(false)
                                            setTarefaSelecionada(null)
                                        }}
                                    />
                                )}
                            </Dialog>
                        </TableBody>
                    </Table>
                </div>
                {
                    dados.length < 10 ? <></> : 
                    <div className="flex items-center justify-center gap-2 mt-4">

                        <Button
                            variant="outline"
                            disabled={pagina === 1}
                            onClick={() => setPagina(pagina - 1)}
                        >
                            Anterior
                        </Button>

                        {(() => {
                            const pages: (number | string)[] = [];
                            const total = totalPaginas;

                            if (total <= 7) {
                                // poucas páginas → mostra todas
                                for (let i = 1; i <= total; i++) pages.push(i);
                            } else {
                                // muitas páginas → compacta

                                // sempre mostra 1 e a última
                                pages.push(1);

                                // caso esteja longe do começo → coloca "..."
                                if (pagina > 3) pages.push("...");

                                // páginas ao redor da página atual
                                const start = Math.max(2, pagina - 1);
                                const end = Math.min(total - 1, pagina + 1);

                                for (let i = start; i <= end; i++) pages.push(i);

                                // caso esteja longe do fim → coloca "..."
                                if (pagina < total - 2) pages.push("...");

                                pages.push(total);
                            }

                            return pages.map((p, idx) =>
                                typeof p === "number" ? (
                                    <Button
                                        key={idx}
                                        className={pagina === p ? "bg-cyan-700 hover:bg-cyan-600" : ""}
                                        variant={pagina === p ? "default" : "outline"}
                                        onClick={() => setPagina(p)}
                                    >
                                        {p}
                                    </Button>
                                ) : (
                                    <span key={idx} className="px-2 text-muted-foreground">
                                        {p}
                                    </span>
                                )
                            )
                        })()}

                        <Button
                            variant="outline"
                            disabled={pagina === totalPaginas}
                            onClick={() => setPagina(pagina + 1)}
                        >
                            Próximo
                        </Button>

                    </div>
                }
            </ScrollArea>
        </div>
    )
}