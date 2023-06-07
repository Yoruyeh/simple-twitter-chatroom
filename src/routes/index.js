import { Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

const baseURL = '/simple-twitter'

// 路由表
const routes = [
  {
    path: `${baseURL}/login`,
    element: <LoginPage />,
  },
  {
    // if 路徑為 / ，跳轉到 /login
    path: `${baseURL}`,
    element: <Navigate to={`${baseURL}/login`} />,
  },
]

export default routes
