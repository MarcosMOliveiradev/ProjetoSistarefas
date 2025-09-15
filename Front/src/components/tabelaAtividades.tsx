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

const atividades = [
    {
        id: 1,
        data: '01/01/2024',
        item: 1,
        codAtividade: 'A001',
        setor: 'Financeiro',
        descricao: 'Revisão de contratos',
        idDocumento: 'D123',
        qtdFolhas: 10,
        inicio: '09:00',
        termino: '10:00',
        numAtendimento: 'AT456',
    },
    {
        id: 2,
        data: '01/01/2024',
        item: 2,
        codAtividade: 'A001',
        setor: 'Financeiro',
        descricao: 'Revisão de contratos',
        idDocumento: 'D123',
        qtdFolhas: 10,
        inicio: '09:00',
        termino: '10:00',
        numAtendimento: 'AT456',
    },
]

export function TabelaAtividades() {
    return (
        <div className='w-screen p-8 text-amber-50'>
            <ScrollArea>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px] text-center text-amber-50">DATA</TableHead>
                            <TableHead className="w-[80px] text-center text-amber-50">ITEM</TableHead>
                            <TableHead className="w-[80px] text-center text-amber-50">CÓD. ATIVIDADE</TableHead>
                            <TableHead className="text-center text-amber-50">SETOR</TableHead>
                            <TableHead className="text-center text-amber-50">DESCRIÇÃO</TableHead>
                            <TableHead className="w-[80px] text-center text-amber-50">ID DOCUMENTO</TableHead>
                            <TableHead className="w-[80px] text-center text-amber-50">QTD FOLHAS</TableHead>
                            <TableHead className="w-[80px] text-center text-amber-50">INICIO</TableHead>
                            <TableHead className="w-[80px] text-center text-amber-50">TERMINO</TableHead>
                            <TableHead className="w-[80px] text-center text-amber-50">Nº ATENTIMENTO</TableHead>
                            <TableHead className="w-[80px] text-center text-amber-50">APAGAR</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            atividades.map((atividades) => (
                                <TableRow className='text-center' key={atividades.id}>
                                    <TableCell>{atividades.data}</TableCell>
                                    <TableCell>{atividades.item}</TableCell>
                                    <TableCell>{atividades.codAtividade}</TableCell>
                                    <TableCell>{atividades.setor}</TableCell>
                                    <TableCell>{atividades.descricao}</TableCell>
                                    <TableCell>{atividades.idDocumento}</TableCell>
                                    <TableCell>{atividades.qtdFolhas}</TableCell>
                                    <TableCell>{atividades.inicio}</TableCell>
                                    <TableCell>{atividades.termino}</TableCell>
                                    <TableCell>{atividades.numAtendimento}</TableCell>
                                    <TableCell>
                                        <Button variant={'ghost'}>Deletar</Button>
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