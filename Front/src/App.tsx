import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router'
import './index.css'

import { queryClient } from './lib/react-query'
import { routes } from './pages/rotes'
import { AuthContextProvider } from './context/authContext'
import { Toaster } from 'sonner'

export function App() {

  return (
   <HelmetProvider>
    <Helmet titleTemplate='%s | SisTarefas' />
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Toaster duration={100} closeButton richColors position='top-center'/>
        <RouterProvider router={routes}/>
      </AuthContextProvider>
    </QueryClientProvider>
   </HelmetProvider>
  )
}

