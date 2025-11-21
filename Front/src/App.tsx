import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import './index.css'

import { queryClient } from './lib/react-query'
import { AppRoutes } from './pages/rotes'
import { AuthContextProvider } from './context/authContext'
import { Toaster } from 'sonner'

export function App() {

  return (
   <HelmetProvider>
    <Helmet titleTemplate='%s | SisTarefas' />
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Toaster duration={10000} closeButton richColors position='top-center'/>
        <AppRoutes/>
      </AuthContextProvider>
    </QueryClientProvider>
   </HelmetProvider>
  )
}

