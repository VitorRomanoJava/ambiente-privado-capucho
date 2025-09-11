import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <-- 1. IMPORTAR O BROWSERROUTER
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Envolvemos toda a aplicação com o BrowserRouter */}
    <BrowserRouter> {/* <-- 2. ENVOLVER O <APP /> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)