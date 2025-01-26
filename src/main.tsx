import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { App } from './app'

import './global.css'

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <StrictMode>
      <Helmet titleTemplate="%s | BellaPizza" />
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </StrictMode>
  </HelmetProvider>
)
