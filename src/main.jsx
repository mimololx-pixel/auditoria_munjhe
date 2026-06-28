import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PreferenciasProvider } from './preferencias.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreferenciasProvider>
      <App />
    </PreferenciasProvider>
  </StrictMode>,
)
