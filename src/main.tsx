import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'

import { App } from './app'
import { ThemeProvider } from './components/theme/theme-provider'
import './global.css'
import { queryClient } from './lib/react-query'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="system">
    <HelmetProvider>
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <Helmet titleTemplate="%s | BellaPizza" />
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </QueryClientProvider>
      </StrictMode>
    </HelmetProvider>
  </ThemeProvider>
)
