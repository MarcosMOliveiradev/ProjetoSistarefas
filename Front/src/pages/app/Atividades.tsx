import { Helmet } from "react-helmet-async";
import { DataPicker } from "../../components/dataPicker";
import { TabelaAtividades } from "@/components/tabelaAtividades";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { CriarAtividadeButton } from "@/components/criarAtividadeButton";

export function Atividades() {
    return (
        <div className="flex gap-4 min-w-screen">
            <Helmet title="Atividades"/>
            <div>
                <div className="flex justify-between items-center mr-8">
                    <DataPicker />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={"outline"}>Criar</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <CriarAtividadeButton />
                        </DialogContent>
                    </Dialog>
                </div>

                
                <TabelaAtividades />
            </div>
        </div>
    )
}