import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { AuthProvider } from './context/AuthContext'
import { GetTweetsProvider } from './context/GetTweets'
import { GetSelectedTweetProvider } from './context/GetSelectedTweet'
import { GetLikesProvider } from './context/GetLikes'
import { GetUserTweetsProvider } from './context/GetUserTweets'

export default function App() {
  const element = useRoutes(routes)
  return (
    <AuthProvider>
      <GetTweetsProvider>
        <GetSelectedTweetProvider>
          <GetLikesProvider>
            <GetUserTweetsProvider>
                 {element}
            </GetUserTweetsProvider>
           </GetLikesProvider>
        </GetSelectedTweetProvider>
      </GetTweetsProvider>
    </AuthProvider>
  )
}
