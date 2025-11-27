import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@/components/theme-provider'
import { store } from './store/store'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider defaultTheme="light" storageKey="task-manager-theme">
          <App />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
