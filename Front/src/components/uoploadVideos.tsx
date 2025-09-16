import { Button } from "./ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectLabel, 
    SelectTrigger, 
    SelectValue 
} from "./ui/select";
import { Textarea } from "./ui/textarea";

export function UpLoadVideos() {
    return (
        <DialogContent className="flex flex-col bg-gray-900 text-gray-300">
            <DialogHeader className="flex flex-col justify-center items-center">
                <DialogTitle>Upload de videos</DialogTitle>
            </DialogHeader>
            <form className="grid grid-cols-2 gap-4">
                <div className="grid gap-2 col-span-2">
                    <Label htmlFor="titulo">Titulo</Label>
                    <Input id="titulo" name="titulo" />
                </div>

                {/* Categoria */}
                <div className="grid gap-2">
                    <Select>
                        <SelectTrigger className=" w-full">
                            <SelectValue placeholder='Selecioane a categoria'/>
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                <SelectLabel className="flex flex-col justify-center items-center">Categorias</SelectLabel>
                                <SelectItem value="Compras">COMPRAS</SelectItem>
                                <SelectItem value="ALMOXARIFADO">ALMOXARIFADO</SelectItem>
                                <SelectItem value="SECRETARIA">SECRETARIA</SelectItem>
                                <SelectItem value="FINANCEIRO">FINANCEIRO</SelectItem>
                                <SelectItem value="DP">DP</SelectItem>
                                <SelectItem value="INFORMATICA">INFORMATICA</SelectItem>
                                <SelectItem value="PONTO">PONTO</SelectItem>
                                <SelectItem value="SEMAC">SEMAC</SelectItem>
                                <SelectItem value="SEMAL">SEMAL</SelectItem>
                                <SelectItem value="PCM">PCM</SelectItem>
                                <SelectItem value="PJA">PJA</SelectItem>
                                <SelectItem value="OUTROS">OUTROS</SelectItem>    
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Roles */}
                <div className="grid gap-2">
                    <Select>
                        <SelectTrigger className=" w-full">
                            <SelectValue placeholder='Selecioane o grupo'/>
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                <SelectLabel className="flex flex-col justify-center items-center">Categorias</SelectLabel>
                                <SelectItem value="TODOS">TODOS</SelectItem>
                                <SelectItem value="Compras">COMPRAS</SelectItem>
                                <SelectItem value="ALMOXARIFADO">ALMOXARIFADO</SelectItem>
                                <SelectItem value="SECRETARIA">SECRETARIA</SelectItem>
                                <SelectItem value="FINANCEIRO">FINANCEIRO</SelectItem>
                                <SelectItem value="DP">DP</SelectItem>
                                <SelectItem value="INFORMATICA">INFORMATICA</SelectItem>
                                <SelectItem value="PONTO">PONTO</SelectItem>
                                <SelectItem value="SEMAC">SEMAC</SelectItem>
                                <SelectItem value="SEMAL">SEMAL</SelectItem>
                                <SelectItem value="PCM">PCM</SelectItem>
                                <SelectItem value="PJA">PJA</SelectItem>
                                <SelectItem value="OUTROS">OUTROS</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="col-span-2">
                    <Textarea placeholder="Descrição" />
                </div>

                <div className="col-span-2">
                    <label htmlFor="video">Videos</label>
                    <Input className="text-gray-100" id="video" name="video"  type="file"/>
                </div>

                <Button className="bg-blue-950">ENVIAR</Button>
                <Button className="border-red-500 text-gray-900" variant={"outline"}>CANCELAR</Button>
            </form>
        </DialogContent>
    )
}