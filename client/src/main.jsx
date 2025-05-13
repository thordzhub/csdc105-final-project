import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // StrictMode is a wrapper component that helps detect potential issues with the app
  // It doesn’t render anything visible on the screen but activates extra checks in development mode.
  <StrictMode>
    {/* 
      BrowserRouter is used to wrap the entire app in order to enable routing functionality.
      It keeps the UI in sync with the URL, allowing navigation between pages without reloading the page.
    */}
    <BrowserRouter>
      {/* Main App component */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
