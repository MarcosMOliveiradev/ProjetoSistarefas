import { Button } from "./ui/button";
import { Menu } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { UpLoadVideos } from "./uoploadVideos";

import { Link } from "react-router"

export function MenuButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="bg-gray-900 "> <Menu /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-gray-200 w-[15rem]" align="end">
                <DropdownMenuGroup className="gap-4 w-[100%]">

                    {/* Lista de atividades */}
                    <DropdownMenuItem asChild>
                        <Button className="w-[100%]" variant={"ghost"}>
                            <Link to={"/"}>ATIVIDADES</Link>
                        </Button>
                    </DropdownMenuItem>

                    {/* Lista de videos */}
                    {/* <DropdownMenuItem asChild>
                        <Button className="w-[100%]" variant={"ghost"}>
                            <Link to={"/videos"}>LISTA DE VIDEOS</Link>
                        </Button>
                    </DropdownMenuItem> */}

                    {/* Criar novo video */}
                    {/* <DropdownMenuItem asChild>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-[100%]" variant={"ghost"}>UPLOAD DE VIDEOS</Button>
                            </DialogTrigger>
                            <UpLoadVideos />
                        </Dialog>
                    </DropdownMenuItem> */}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}