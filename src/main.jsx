import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/layout.css'
import './style/style.css'
import './style/effect.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
