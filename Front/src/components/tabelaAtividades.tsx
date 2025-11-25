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
import { Trash2 } from 'lucide-react'
import type { tarefasDTO } from '@/dtos/tarefasDTO'

export function TabelaAtividades({ dados }: any) {
    // filtro de ordenação
    const [sortCol, setSortCol] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null);

    // paginação
    const [pagina, setPagina] = useState(1);
    const registrosPorPagina = 10;

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

    const dadosPaginados = useMemo(() => {
        const inicio = (pagina - 1) * registrosPorPagina;
        const fim = inicio + registrosPorPagina;
        return dadosOrdenados.slice(inicio, fim);
    }, [dadosOrdenados, pagina]);

    return (
        <div className='m-4 max-w-full text-muted-foreground'>
            <ScrollArea>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px] text-center text-muted-foreground">DATA</TableHead>
                            <TableHead
                                className="w-[60px] text-center cursor-pointer"
                                onClick={() => handleSort("item")}
                                >
                                ITEM {sortCol === "item" && (sortDir === "asc" ? "▲" : "▼")}
                            </TableHead>
                            <TableHead
                                className="w-[60px] text-center cursor-pointer"
                                onClick={() => handleSort("codAtividade")}
                                >
                                CÓd. ATIVIDADE {sortCol === "codAtividade" && (sortDir === "asc" ? "▲" : "▼")}
                            </TableHead>
                            <TableHead className="text-center text-muted-foreground">SETOR</TableHead>
                            <TableHead
                                className="text-center cursor-pointer"
                                onClick={() => handleSort("descricao")}
                                >
                                DESCRIÇÃO {sortCol === "descricao" && (sortDir === "asc" ? "▲" : "▼")}
                            </TableHead>
                            <TableHead className="w-[60px] text-center text-muted-foreground">ID DOCUMENTO</TableHead>
                            <TableHead className="w-[60px] text-center text-muted-foreground">QTD FOLHAS</TableHead>
                            <TableHead className="w-[60px] text-center text-muted-foreground">INICIO</TableHead>
                            <TableHead className="w-[60px] text-center text-muted-foreground">TERMINO</TableHead>
                            <TableHead className="w-[60px] text-center text-muted-foreground">Nº ATENTIMENTO</TableHead>
                            <TableHead className="w-[60px] text-center text-muted-foreground">APAGAR</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            dadosPaginados.map((dado: tarefasDTO) => (
                                <TableRow className='text-center' key={dado.tarefas.id}>
                                    <TableCell>{dado.tarefas.data}</TableCell>
                                    <TableCell>{dado.tarefas.item}</TableCell>
                                    <TableCell>{dado.tarefas.cod_atividade}</TableCell>
                                    <TableCell>{dado.Atividade.setor}</TableCell>
                                    <TableCell>{dado.Atividade.descricao}</TableCell>
                                    <TableCell>{dado.tarefas.id_documento}</TableCell>
                                    <TableCell>{dado.tarefas.qtd_folha}</TableCell>
                                    <TableCell>{dado.tarefas.h_inicio}</TableCell>
                                    <TableCell>{dado.tarefas.h_termino}</TableCell>
                                    <TableCell>{dado.tarefas.n_atendimento}</TableCell>
                                    <TableCell>
                                        <Button variant={'ghost'}><Trash2 className='w-4'/></Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <div className="flex items-center justify-center gap-2 mt-4">
                    <Button
                        variant="outline"
                        disabled={pagina === 1}
                        onClick={() => setPagina(pagina - 1)}
                    >
                        Anterior
                    </Button>

                    {Array.from({ length: totalPaginas }, (_, i) => (
                        <Button
                        className={pagina === i + 1 ? "bg-cyan-700 hover:bg-cyan-600" : ""}
                        key={i}
                        variant={pagina === i + 1 ? "default" : "outline"}
                        onClick={() => setPagina(i + 1)}
                        >
                        {i + 1}
                        </Button>
                    ))}

                    <Button
                        variant="outline"
                        disabled={pagina === totalPaginas}
                        onClick={() => setPagina(pagina + 1)}
                    >
                        Próximo
                    </Button>
                </div>
            </ScrollArea>
        </div>
    )
}