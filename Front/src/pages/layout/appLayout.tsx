import { NavLink, Outlet } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PiMedalFill } from "react-icons/pi";

import profile from "../../assets/PROFILE.png"
import { MenuButton } from "@/components/menuButton";
import { getProfile } from "@/api/profile";
import { Feedback } from "@/components/feedback";
import { registraEntrada } from "@/api/registraEntrada";
import { useEffect } from "react";

export function AppLayout() {
    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity
    })

    const registrarEntradaMutation = useMutation({
    mutationFn: registraEntrada
    })

    useEffect(() => {
        if (!data?.user) return

        registrarEntradaMutation.mutate()
    }, [data?.user])
    
    if(!data) {
        return
    }

    const nomeSeparado = data?.user.name.split(" ")


    return (
        <div className=" min-h-screen flex flex-col bg-muted text-muted-foreground content-between">
            <div className=" flex h-[5rem] items-center">
                <div className="w-1/3 px-4 font-bold text-3xl ml-10">W Engenharia</div>
                <div className="flex flex-row w-full justify-end items-center gap-8">
                    <PiMedalFill  className="w-[2.5rem] h-[2.5rem] fill-gold" />
                    <NavLink className="flex items-center gap-1" to="/profile">
                        <img src={data?.user.avatarUrl ? data.user.avatarUrl : profile} className="w-10 h-10 rounded-full object-cover shadow-xl/20" alt="" />
                        <p>{`${nomeSeparado[0]} ${nomeSeparado[1]}`}</p>
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