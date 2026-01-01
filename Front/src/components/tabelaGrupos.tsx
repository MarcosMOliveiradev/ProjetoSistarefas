import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "./ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { findGrupos } from "@/api/findGrupos";
import { Spinner } from "./ui/spinner";
import type { gruposDTO } from "@/dtos/gruposDTO";
import { Button } from "./ui/button";
import { useState } from "react";
import { VincularUsuarioDialog } from "./VincularUsuarioDialog";

export function TabelaGrupos() {
    const [grupoSelecionado, setGrupoSelecionado] = useState<string | null>(null)

    const { data: grupos } = useQuery({
        queryKey: ['grupos'],
        queryFn: findGrupos
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