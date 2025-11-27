import { Helmet } from "react-helmet-async";
import { DataPicker } from "../../components/dataPicker";
import { TabelaAtividades } from "@/components/tabelaAtividades";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { CriarAtividadeButton } from "@/components/criarAtividadeButton";
import { useState } from "react";
import type { tarefasDTO } from "@/dtos/tarefasDTO";

export function Atividades() {
    const [tarefas, setTarefas] = useState<tarefasDTO[]>([])
    return (
        <div >
            <Helmet title="Atividades"/>
            <div>
                <div className="flex justify-between items-center mr-8">
                    {/* Componente que filtra data */}
                    <DataPicker onDadosTarefas={setTarefas} />

                    {/* Componente pra criar atividade */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-[8rem] cursor-pointer bg-slate-500 hover:bg-slate-400 text-muted" variant={"outline"}>Criar</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <CriarAtividadeButton />
                        </DialogContent>
                    </Dialog>
                </div>
                
                {/* Componente de renderização de tarefas  */}
                <TabelaAtividades dados={tarefas} />
            </div>
        </div>
    )
}