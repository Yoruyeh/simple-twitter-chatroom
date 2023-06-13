import { Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegistPage from '../pages/RegistPage'
import AdminLoginPage from '../pages/AdminLoginPage'
import HomePage from '../pages/HomePage'
import UserPage from '../pages/UserPage'
import SettingPage from '../pages/SettingPage'
import ReplyPage from '../pages/ReplyPage'
import UserFollowerPage from '../pages/UserFollowerPage'
import AdminCardPage from '../pages/AdminCardPage'
// import TabRepliesTweets from '../components/common/TabRepliesTweets'
// import TabLikesTweets from '../components/common/TabLikesTweets'
import TabTweets from '../components/common/TabTweets'
import { TabTweetItems } from '../components/common/TabTweetItems'

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
    children: [
      {
        path: '',
        element: <TabTweets />,
      },
      // {
      //   path: 'replies',
      //   element: <TabRepliesTweets />,
      // },
      // {
      //   path: 'likes',
      //   element: <TabLikesTweets />,
      // },
    ],
  },
  {
    path: '/setting',
    element: <SettingPage />,
  },
  {
    path: '/tweets/:id',
    element: <ReplyPage />,
  },
  {
    path: '/:id/followers',
    element: <UserFollowerPage />,
  },
  {
    path: '/:id/followings',
    element: <UserFollowerPage />,
  },
  {
    path: '/admin/card',
    element: <AdminCardPage />,
  },
  {
    path: '/test',
    element: <TabTweetItems />,
  },
  {
    path: '/tweets/:id/reply',
    element: <HomePage />,
  },
]

export default routes
