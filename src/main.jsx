import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './App.css'

/**
 * Purpose: Entry point of the React application.
 * 
 * BrowserRouter: Enables client-side routing (URL changes without page reload)
 * StrictMode: Helps detect potential problems during development
 * createRoot: React 18 way to render the app into the DOM
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
