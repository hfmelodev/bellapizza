import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'

import { App } from './app'
import { ThemeProvider } from './components/theme/theme-provider'
import './global.css'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="system">
    <HelmetProvider>
      <StrictMode>
        <Helmet titleTemplate="%s | BellaPizza" />
        <BrowserRouter>
          <App />
          <Toaster richColors />
        </BrowserRouter>
      </StrictMode>
    </HelmetProvider>
  </ThemeProvider>
)
