import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { ToastProvider } from './hooks/useToast.tsx'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 60_000,
    },
    mutations: {
      onError: (error: unknown) => {
        console.error('Mutation error:', error);
      },
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <App />
          {import.meta.env.DEV && (
            <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
          )}
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)
