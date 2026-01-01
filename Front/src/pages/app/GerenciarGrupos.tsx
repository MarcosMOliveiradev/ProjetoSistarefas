import { CriarGrupos } from "@/components/CriarGrupos";
import { TabelaGrupos } from "@/components/tabelaGrupos";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Helmet } from "react-helmet-async"


export function GerenciarGrupos() {

    return (
        <div className="m-10">
            <Helmet title="Grupos"/>
            <div className="flex flex-col items-end">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-[10rem] cursor-pointer bg-slate-500 hover:bg-slate-400 text-muted" variant={"outline"}>Criar novo grupo</Button>
                    </DialogTrigger>
                    <CriarGrupos/>
                </Dialog>
            </div>
            <div> 
                <h2>Grupos existentes</h2>
                <div>
                    <TabelaGrupos/>
                </div>
            </div>
        </div>
    )
}