import { MenuButton } from "@/components/menuButton";
import { Outlet } from "react-router";

export function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-gray-400">
            <div className=" flex gap-4 min-w-screen h-[5rem] items-center">
                <div className="w-1/4"></div>
                <div className="flex flex-row w-full justify-between ">
                    <div></div>
                    <div className="mr-[4rem]"> <MenuButton /></div>
                </div>
            </div>

            <div>
                <Outlet />
            </div>

        </div>
    )
}