import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { GetTheTweetProvider } from './context/GetTheTweet'
import { CreateTweetProvider } from './context/CreateTweet'
import { CreateReplyProvider } from './context/CreateReply'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  const element = useRoutes(routes)
  return (
    <AuthProvider>
    <GetTheTweetProvider>
    <CreateTweetProvider>
    <CreateReplyProvider>
    {element}
    </CreateReplyProvider>
    </CreateTweetProvider>
    </GetTheTweetProvider>
    </AuthProvider>
  )
}
