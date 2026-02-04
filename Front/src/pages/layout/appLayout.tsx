import { NavLink, Outlet } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PiMedalFill } from "react-icons/pi";
import { FaFireFlameCurved } from "react-icons/fa6";

import profile from "../../assets/PROFILE.png"
import { MenuButton } from "@/components/menuButton";
import { getProfile } from "@/api/profile";
import { Feedback } from "@/components/feedback";
import { registraEntrada } from "@/api/registraEntrada";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { Spinner } from "@/components/ui/spinner";

export function AppLayout() {
    const { data: user } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity
    })

    const { data: countAnalise, isPending } = useQuery<{total: number, mesAtual: boolean}>({
        queryKey: ['analise', user?.user.id],
        queryFn: async () => {
            const { data } = await api.get(`/analise/count/${user?.user.id}`)

            return data
        },
        staleTime: Infinity
    })

    const registrarEntradaMutation = useMutation({
    mutationFn: registraEntrada
    })

    useEffect(() => {
        if (!user?.user) return

        registrarEntradaMutation.mutate()
    }, [user?.user])
    
    if(!user) {
        return
    }

    const nomeSeparado = user?.user.name.split(" ")


    return (
        <div className=" min-h-screen flex flex-col bg-muted text-muted-foreground content-between">
            <div className=" flex h-[5rem] items-center">
                <div className="w-1/3 px-4 font-bold text-3xl ml-10">W Engenharia</div>
                <div className="flex flex-row w-full justify-end items-center gap-8">
                    {isPending && <Spinner />}
                    {<div className="flex justify-center items-center gap-2">
                        <PiMedalFill  className="w-[2.5rem] h-[2.5rem] fill-gold" />
                        <strong className="text-2xl text-gold">{countAnalise?.total}</strong>
                        <strong className="text-[1rem] text-emerald-700">{countAnalise?.mesAtual === true ? 'Parabéns!!' : ''}</strong>
                        <FaFireFlameCurved className={`w-[1.5rem] h-[1.5rem] ${countAnalise?.mesAtual === true ? 'text-gold' : 'text-gray-500'}`}/>
                    </div>}
                    <NavLink className="flex items-center gap-1" to="/profile">
                        <img src={user?.user.avatarUrl ? user.user.avatarUrl : profile} className="w-10 h-10 rounded-full object-cover shadow-xl/20" alt="" />
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