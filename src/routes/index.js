import { Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegistPage from '../pages/RegistPage'
import AdminLoginPage from '../pages/AdminLoginPage'
import HomePage from '../pages/HomePage'
import UserPage from '../pages/UserPage'
import SettingPage from '../pages/SettingPage'

// 路由表
const routes = [
  {
    path: `/login`,
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegistPage />,
  },
  {
    path: '/admin',
    element: <AdminLoginPage />,
  },
  {
    path: `/simple-twitter`,
    element: <Navigate to={`/login`} />,
  },
  {
    path: `/`,
    element: <Navigate to={`/login`} />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/:userID',
    element: <UserPage />,
  },
  {
    path: '/setting',
    element: <SettingPage />,
  },
]

export default routes
