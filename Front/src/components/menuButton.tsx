import { Button } from "./ui/button";
import { Menu } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

import { Link } from "react-router"

export function MenuButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="bg-muted "> <Menu /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-muted text-muted-foreground w-[15rem]" align="end">
                <DropdownMenuGroup className="gap-4 w-[100%]">

                    {/* Lista de atividades */}
                    <DropdownMenuItem asChild>
                        <Button className="w-[100%] hover:bg-muted" variant={"ghost"}>
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