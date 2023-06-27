import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { AuthProvider } from './context/AuthContext'
import { GetTweetsProvider } from './context/GetTweets'
import { GetSelectedTweetProvider } from './context/GetSelectedTweet'
import { GetLikesProvider } from './context/GetLikes'
import { GetUserTweetsProvider } from './context/GetUserTweets'
import { SocketContextProvider } from './context/SocketContext'

export default function App() {
  const element = useRoutes(routes)
  
  

  return (
    <div className="App">
    <AuthProvider>
      <GetTweetsProvider>
        <GetSelectedTweetProvider>
            <GetUserTweetsProvider>
              <GetLikesProvider>
                <SocketContextProvider>
                 {element}
                 </SocketContextProvider>
                 </GetLikesProvider>
            </GetUserTweetsProvider>
        </GetSelectedTweetProvider>
      </GetTweetsProvider>
    </AuthProvider>
    </div>
  )
}
