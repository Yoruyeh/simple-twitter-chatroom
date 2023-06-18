import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './reset.css'
import './index.scss'

const basename = process.env.PUBLIC_URL

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
     </BrowserRouter>
  </React.StrictMode>
)
