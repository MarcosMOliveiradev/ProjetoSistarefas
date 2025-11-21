import { MenuButton } from "@/components/menuButton";
import { NavLink, Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";

import profile from "../../assets/PROFILE.png"

export function AppLayout() {
    const { user } = useAuth()

    return (
        <div className=" min-h-screen flex flex-col bg-muted text-muted-foreground content-between">
            <div className=" flex gap-4 h-[5rem] items-center">
                <div className="w-1/3 px-4 font-bold text-3xl ml-10">W Engenharia</div>
                <div className="flex flex-row w-full justify-end items-center gap-8">
                    <NavLink className="flex items-center gap-1" to="/profile">
                        <img src={user.user.avatarUrl ? user.user.avatarUrl : profile} className="w-10 h-10 rounded-[50%]" alt="" />
                        <p>{user.user.name}</p>
                    </NavLink>

                    <div className="mr-[4rem]"> <MenuButton /></div>
                </div>
            </div>

            <div className="">
                <Outlet />
            </div>

        </div>
    )
}