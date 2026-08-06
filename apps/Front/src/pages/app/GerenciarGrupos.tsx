import { CriarGrupos } from "@/components/CriarGrupos";
import { TabelaGrupos } from "@/components/tabelaGrupos";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Helmet } from "react-helmet-async"


export function GerenciarGrupos() {
    const [open, setOpen] = useState(false)

    return (
        <div className="m-10">
            <Helmet title="GERENCIAR GRUPO"/>
            <div className="flex flex-col items-end">
                <div>
                    <Button 
                        className="w-[10rem] cursor-pointer bg-slate-500 hover:bg-slate-400 text-muted" 
                        variant={"outline"}
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpen(true)
                        }}
                    >Criar novo grupo</Button>
                    <CriarGrupos
                        open={open}
                        onClose={setOpen}
                    />
                </div>
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