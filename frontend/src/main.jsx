import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SocketContextProvider } from './context/SocketContext.jsx' // 1. Import it

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 2. Wrap the App with your new Context Provider */}
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)