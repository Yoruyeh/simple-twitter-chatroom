import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css'
import { useRoutes } from 'react-router-dom'
import routes from './routes'

export default function App() {
  const element = useRoutes(routes)
  return <React.StrictMode>{element}</React.StrictMode>
}
