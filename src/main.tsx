import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// src/main.tsx
import './styles/tokens.css';
import './App.css';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
