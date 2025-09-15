import { createBrowserRouter } from "react-router";

import { AppLayout } from "./layout/AppLayout";

import { Video } from './app/videos'
import { Atividades } from "./app/Atividades";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: '/', element: <Atividades />},
            { path: 'videos', element: <Video />}
        ]
    },
])