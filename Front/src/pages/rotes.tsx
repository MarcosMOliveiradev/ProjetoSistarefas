import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { useAuth } from "@/hooks/useAuth";

import { SignIn } from "./auth/sign-in";

import { AppLayout } from "./layout/AppLayout";
import { Atividades } from "./app/Atividades";
import { Video } from "./app/videos";

export function AppRoutes() {
    const { user, isLoadingUserStorageData } = useAuth()

    // if(isLoadingUserStorageData) {
    //     return 
    // }

   return (
    <BrowserRouter>
        <Routes>
            {
                !user.id ? (
                    <>
                        <Route path="/auth" element={<SignIn/>} />
                        <Route path="*" element={<Navigate to="/auth" replace />} />
                    </>
                ) : (
                    <>
                        {/* Rotas privadas */}
                        <Route path="/" element={<AppLayout/>} >
                            <Route path="/" index element={<Atividades/>} />
                            <Route path="/video" element={<Video/>} />
                        </Route>
                         <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                )
            }
        </Routes>
    </BrowserRouter>
  )
}