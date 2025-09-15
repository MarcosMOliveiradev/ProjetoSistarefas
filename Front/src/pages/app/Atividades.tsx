import { Helmet } from "react-helmet-async";
import { DataPicker } from "../../components/dataPicker";
import { TabelaAtividades } from "@/components/tabelaAtividades";

export function Atividades() {
    return (
        <div className="flex gap-4 min-w-screen">
            <Helmet title="Atividades"/>
            <div>
                <DataPicker />
                
                <TabelaAtividades />
            </div>
        </div>
    )
}