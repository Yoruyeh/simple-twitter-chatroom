import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { AuthProvider } from './context/AuthContext'
import { GetTweetsProvider } from './context/GetTweets'
import { GetSelectedTweetProvider } from './context/GetSelectedTweet'
import { GetLikesProvider } from './context/GetLikes'
import { GetUserTweetsProvider } from './context/GetUserTweets'
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { MyForm } from './components/MyForm';
import { Events } from './components/Events'
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
                 <ConnectionState  />
                  <Events  />
                  <ConnectionManager />
                  <MyForm />
                 </SocketContextProvider>
                 </GetLikesProvider>
            </GetUserTweetsProvider>
        </GetSelectedTweetProvider>
      </GetTweetsProvider>
    </AuthProvider>
    </div>
  )
}
