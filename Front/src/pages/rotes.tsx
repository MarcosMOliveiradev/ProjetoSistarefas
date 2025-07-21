import { createBrowserRouter } from "react-router";

import { Video } from './app/videos'
import { AppLayout } from "./layout/appLayout";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: '/', element: <Video />}
        ]
    },
])