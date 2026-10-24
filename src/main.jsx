import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { BookingsProvider } from './BookingsContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BookingsProvider>
        <App />
      </BookingsProvider>
    </BrowserRouter>
  </StrictMode>
)
