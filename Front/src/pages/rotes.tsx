import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { SignIn } from "./auth/sign-in";

import { AppLayout } from "./layout/AppLayout";
import { Atividades } from "./app/Atividades";
import { Video } from "./app/videos";
import { Profile } from "./app/Profille";
import { useAuth } from "@/hooks/useAuth";
import { FeedbackRelatorio } from "./app/FeedbackRelatorio";
import { Dashboard } from "./app/dashboard";

export function AppRoutes() {
    const { token, isLoadingUserStorageData } = useAuth()

    if(isLoadingUserStorageData) {
        return <div className="flex flex-col justify-between text-center items-center">Carregando...</div>
    }

   return (
    <BrowserRouter>
        <Routes>
            {
                !token ? (
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
                            <Route path="/profile" element={<Profile/>} />
                            <Route path="/feedback" element={<FeedbackRelatorio/>} />
                            <Route path="/dash" element={<Dashboard/>} />
                        </Route>
                         <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                )
            }
        </Routes>
    </BrowserRouter>
  )
}