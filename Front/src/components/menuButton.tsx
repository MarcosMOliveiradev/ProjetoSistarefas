import { Button } from "./ui/button";
import { Menu } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query"

import { Link } from "react-router"
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { CodAtividades } from "./codAtividades";
import type { userDTO } from "@/dtos/userDto";

export function MenuButton() {
    const { signOut } = useAuth()
    const queryClient = useQueryClient()
    const user = queryClient.getQueryData<userDTO>(['profile'])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="bg-muted cursor-pointer"> <Menu /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-muted text-muted-foreground w-[15rem]" align="end">
                <DropdownMenuGroup className="flex flex-col gap-1">

                    {/* Lista de atividades */}
                    <DropdownMenuItem asChild>
                        <Button asChild className="w-[100%] hover:bg-muted border-2 cursor-pointer " variant={"ghost"}>
                            <Link to={"/"}>ATIVIDADES</Link>
                        </Button>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Button asChild className="w-[100%] hover:bg-muted border-2 cursor-pointer " variant={"ghost"}>
                            <Link to={"/dash"}>DASHBOARD</Link>
                        </Button>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-[100%] hover:bg-muted border-2 cursor-pointer " variant={"ghost"}>CÓD DE ATIVIDADE</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <CodAtividades />
                                </DialogContent>
                            </Dialog>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Button asChild className="w-[100%] hover:bg-muted border-2 cursor-pointer " variant={"ghost"}>
                            <Link to={"/feedback"}>RELATÓRIO DE FEEDBACK</Link>
                        </Button>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Button asChild className="w-[100%] hover:bg-muted border-2 cursor-pointer " variant={"ghost"}>
                            <Link to={"/consultar"}>CONSULTAR PRESENÇA</Link>
                        </Button>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Button asChild className="w-[100%] hover:bg-muted border-2 cursor-pointer " variant={"ghost"}>
                            <Link to={"/analise"}>SELOS</Link>
                        </Button>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Button asChild className="w-[100%] hover:bg-muted border-2 cursor-pointer " variant={"ghost"}>
                            <Link to={"/sobre"}>SOBRE</Link>
                        </Button>
                    </DropdownMenuItem>

                    {user?.user_roles.role !== "INFORMATICA" ? 
                        <></> :
                        <>
                            <DropdownMenuItem asChild>
                                <Button asChild className="w-[100%] hover:bg-muted border-2 cursor-pointer " variant={"ghost"}>
                                    <Link to={"/analises"}>RELATÓRIO DE SELOS</Link>
                                </Button>
                            </DropdownMenuItem>                        
                            <DropdownMenuItem asChild>
                                <Button asChild className="w-[100%] hover:bg-muted border-2 cursor-pointer " variant={"ghost"}>
                                    <Link to={"/gerenciargrupo"}>GERENCIAR GRUPO</Link>
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Button asChild className="w-[100%] hover:bg-muted border-2 cursor-pointer " variant={"ghost"}>
                                    <Link to={"/gerenciarpresenca"}>GERENCIAR PRESENÇA</Link>
                                </Button>
                            </DropdownMenuItem>
                        </>
                    }

                    <DropdownMenuItem asChild>
                        <Button onClick={signOut} className="w-[100%] hover:bg-muted mt-4" variant={"destructive"}>
                            <Link to={"/"}>SAIR</Link>
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