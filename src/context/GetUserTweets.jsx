import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserInfo, getUserTweets, getUserReplies, getUserLikes } from '../api/other.users'
import { useAuth } from './AuthContext';



const GetUserTweetsContext = createContext(() => {});

export const useGetUserTweets = () => useContext(GetUserTweetsContext);

export const GetUserTweetsProvider = ({ children }) => {
  const navigate = useNavigate()
  const { currentMember } = useAuth()
  const [userInfo, setUserInfo] = useState({})
  const [userTweets, setUserTweets] = useState([])
  const [userReplies, setUserReplies] = useState([])
  const [userLikes, setUserLikes] = useState([])

  const handleAvatarClick = async (id) => {
    if (currentMember.id === Number(id)) {
      navigate(`/${id}`)
    } else {
      try {
      const info = await getUserInfo(id)
      setUserInfo(info)
      const tweets = await getUserTweets(id)
      setUserTweets(tweets)
      navigate(`/other/${id}`)
      const replies = await getUserReplies(id)
      setUserReplies(replies)
      const likes = await getUserLikes(id)
      setUserLikes(likes)
    } catch (error) {
      console.error(error)
    }
    }
  }


  return (
    <GetUserTweetsContext.Provider 
    value={{userInfo, userTweets, handleAvatarClick, userReplies, userLikes}}>
      {children}
    </GetUserTweetsContext.Provider>
  );
};
