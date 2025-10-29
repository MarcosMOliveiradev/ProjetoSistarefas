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
    return (
        <div className='m-8 max-w-screen text-muted-foreground'>
            <ScrollArea>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px] text-center text-muted-foreground">DATA</TableHead>
                            <TableHead className="w-[60px] text-center text-muted-foreground">ITEM</TableHead>
                            <TableHead className="w-[60px] text-center text-muted-foreground">CÓD. ATIVIDADE</TableHead>
                            <TableHead className="text-center text-muted-foreground">SETOR</TableHead>
                            <TableHead className="text-center text-muted-foreground">DESCRIÇÃO</TableHead>
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
                            dados.map((dado: tarefasDTO) => (
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
            </ScrollArea>
        </div>
    )
}