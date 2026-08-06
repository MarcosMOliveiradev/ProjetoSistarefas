import { Helmet } from "react-helmet-async";
import { DataPicker } from "../../components/dataPicker";
import { TabelaAtividades } from "@/components/tabelaAtividades";
import { Button } from "@/components/ui/button";
import { CriarAtividadeButton } from "@/components/criarAtividadeButton";
import { useState } from "react";
import type { tarefasDTO } from "@/dtos/tarefasDTO";
import { SearchTarefas } from "@/components/searchTarefas";

export function Atividades() {
    const [tarefas, setTarefas] = useState<tarefasDTO[]>([])
    const [open, setOpen] = useState(false)
    return (
        <div >
            <Helmet title="ATIVIDADES"/>
            <div>
                <div className="flex justify-between items-center mr-8">
                    {/* Componente que filtra data */}
                    <DataPicker onDadosTarefas={setTarefas} />

                    <SearchTarefas onDadosTarefas={setTarefas}/>

                    {/* Componente pra criar atividade */}
                    <Button
                        className="w-[8rem] cursor-pointer bg-slate-500 hover:bg-slate-400 text-muted"
                        variant={"outline"}
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpen(true)
                        }}
                    >
                        Criar
                    </Button>

                    <CriarAtividadeButton
                        open={open}
                        onClose={setOpen}
                    />
                </div>
                
                {/* Componente de renderização de tarefas  */}
                <TabelaAtividades dados={tarefas} />
            </div>
        </div>
    )
}