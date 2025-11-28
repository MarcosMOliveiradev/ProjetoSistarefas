import { NavLink, Outlet } from "react-router";
import { useQuery } from "@tanstack/react-query";

import profile from "../../assets/PROFILE.png"
import { MenuButton } from "@/components/menuButton";
import { getProfile } from "@/api/profile";
import { Feedback } from "@/components/feedback";

export function AppLayout() {
    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity
    })

    return (
        <div className=" min-h-screen flex flex-col bg-muted text-muted-foreground content-between">
            <div className=" flex gap-4 h-[5rem] items-center">
                <div className="w-1/3 px-4 font-bold text-3xl ml-10">W Engenharia</div>
                <div className="flex flex-row w-full justify-end items-center gap-8">
                    <NavLink className="flex items-center gap-1" to="/profile">
                        <img src={data?.user.avatarUrl ? data.user.avatarUrl : profile} className="w-10 h-10 rounded-full object-cover shadow-xl/20" alt="" />
                        <p>{data?.user.name}</p>
                    </NavLink>

                    <div className="mr-[4rem]"> <MenuButton /></div>
                </div>
            </div>

            <div className="">
                <Outlet />
            </div>

            <Feedback/>
        </div>
    )
}