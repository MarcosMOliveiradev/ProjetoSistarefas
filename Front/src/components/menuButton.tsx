import { Button } from "./ui/button";
import { Menu } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function MenuButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="bg-gray-900 "> <Menu /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-gray-200 w-[15rem]" align="end">
                <DropdownMenuGroup className="gap-4">
                    <DropdownMenuItem>
                        UPLOAD DE VIDEOS
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        LISTA DE VIDEOS
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}