import { MenuButton } from "@/components/menuButton";
import { Outlet } from "react-router";

export function AppLayout() {
    return (
        <div className="min-h-screen max-w-screen flex flex-col bg-muted text-muted-foreground content-between">
            <div className=" flex gap-4 h-[5rem] items-center">
                <div className="w-1/3 px-4 font-bold text-3xl">W Engenharia</div>
                <div className="flex flex-row w-full justify-end items-center gap-8">
                    <div>PROFILE</div>
                    <div className="mr-[4rem]"> <MenuButton /></div>
                </div>
            </div>

            <div className="max-w-screen">
                <Outlet />
            </div>

        </div>
    )
}