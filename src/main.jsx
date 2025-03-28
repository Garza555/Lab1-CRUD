import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Managers from './Managers.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Managers />
  </StrictMode>,
)
