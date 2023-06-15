import { Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegistPage from '../pages/RegistPage'
import AdminLoginPage from '../pages/AdminLoginPage'
import HomePage from '../pages/HomePage'
import UserPage from '../pages/UserPage'
import SettingPage from '../pages/SettingPage'
import ReplyPage from '../pages/ReplyPage'
import UserFollowerPage from '../pages/UserFollowerPage'
import AdminCard from '../components/AdminCard'
import TabRepliesTweets from '../components/common/TabRepliesTweets'
import TabLikesTweets from '../components/common/TabLikesTweets'
import TabTweets from '../components/common/TabTweets'
import AdminList from '../components/AdminList'
import AdminPage from '../pages/AdminPage'
import OtherUserPage from '../pages/OtherUserPage'
import OtherUserFollowerPage from '../pages/OtherUserFollowerPage'


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
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    children: [
      {
        index: true,
        element: <Navigate to='list' />,
      },
      {
        path: 'list',
        element: <AdminList />,
      },
      {
        path: 'cards',
        element: <AdminCard />,
      },
    ],
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
        index: true,
        element: <TabTweets />,
      },
      {
        path: 'replies',
        element: <TabRepliesTweets />,
      },
      {
        path: 'likes',
        element: <TabLikesTweets />,
      },
    ],
  },
  {
    path: '/others/:userID',
    element: <OtherUserPage />,
    children: [
      {
        index: true,
        element: <TabTweets />,
      },
      {
        path: 'replies',
        element: <TabRepliesTweets />,
      },
      {
        path: 'likes',
        element: <TabLikesTweets />,
      }
    ],
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
    path: '/others/:id/followers',
    element: <OtherUserFollowerPage />,
  },
  {
    path: '/others/:id/followings',
    element: <OtherUserFollowerPage />,
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
    path: '/tweets/:id/reply',
    element: <HomePage />,
  },
  {
    path: '/replies/tweets/:id/reply',
    element: <ReplyPage />,
  },
  {
    path: '/:userId',
    element: <UserPage />,
    children: [
      {
        path: 'tweets/:id/reply',
        element: <TabTweets />,
      },
    ]
  },
  {
    path: '/others/:id',
    element: <OtherUserPage />,
    children: [
      {
        path: 'tweets/:id/reply',
        element: <TabTweets />,
      },
    ]
  },
]

export default routes
