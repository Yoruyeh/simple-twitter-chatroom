import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { GetTheTweetProvider } from './context/GetTheTweet'
import { CreateTweetProvider } from './context/CreateTweet'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  const element = useRoutes(routes)
  return (
    <AuthProvider>
    <CreateTweetProvider>
    <GetTheTweetProvider>
    {element}
    </GetTheTweetProvider>
    </CreateTweetProvider>
    </AuthProvider>
  )
}
