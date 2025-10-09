import { createBrowserRouter } from "react-router";

import { AppLayout } from "./layout/AppLayout";

import { Video } from './app/videos'
import { Atividades } from "./app/Atividades";
import { SignIn } from "./auth/sign-in";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: '/', element: <Atividades />},
            { path: 'videos', element: <Video />}
        ]
    },
    {
        path: '/',
        element: <SignIn/>
    }
])