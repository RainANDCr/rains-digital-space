import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './i18n'
import App from './App'
import { ThemeProvider } from './components/ThemeProvider'
import './styles/global.css'
createRoot(document.getElementById('root')).render(<StrictMode><ThemeProvider><BrowserRouter><App /></BrowserRouter></ThemeProvider></StrictMode>)
