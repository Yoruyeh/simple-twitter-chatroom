import { Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

// 路由表
const routes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    // if 路徑為 / ，跳轉到 /login
    path: '/',
    element: <Navigate to='/login' />,
  },
]

export default routes
