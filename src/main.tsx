import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from 'react-router-dom';
import SnackBarComponent from './components/snackBar';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Inicialize o QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Tenta novamente em caso de falha (padrão: 3)
      refetchOnWindowFocus: false, // Não refaz a consulta ao mudar o foco para a janela
      staleTime: 1000 * 60 * 15, // Considera os dados frescos por 15 minutos
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationProvider>
            <SnackBarComponent />
            <Suspense>
              <App />
            </Suspense>
          </NotificationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
