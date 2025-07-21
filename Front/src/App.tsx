import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router'
import './index.css'

import { queryClient } from './lib/react-query'
import { routes } from './pages/rotes'

export function App() {

  return (
   <HelmetProvider>
    <Helmet titleTemplate='%s | SisTarefas' />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}/>
    </QueryClientProvider>
   </HelmetProvider>
  )
}

