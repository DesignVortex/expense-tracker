import React from 'react'
import ReactDOM from 'react-dom/client'
// Move imports that might crash to dynamic import
// import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'

const root = ReactDOM.createRoot(document.getElementById('root'))

// Try to safely render the error if initial imports fail
const renderError = (error) => {
  document.body.innerHTML = `
    <div style="padding: 2rem; color: #D32F2F; font-family: sans-serif;">
      <h1>Application Failed to Start</h1>
      <p>There was an error initializing the application. This is likely a configuration or dependency issue.</p>
      <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow: auto;">${error.toString()}</pre>
    </div>
  `
}

import('./App.jsx')
  .then(({ default: App }) => {
    try {
      root.render(
        <React.StrictMode>
          <ErrorBoundary>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </ErrorBoundary>
        </React.StrictMode>,
      )
    } catch (e) {
      renderError(e)
    }
  })
  .catch(renderError)
