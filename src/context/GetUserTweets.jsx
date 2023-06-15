import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserInfo, getUserTweets } from '../api/other.users'
import { useAuth } from './AuthContext';
// import { getTweets, createTweet } from '../api/tweets'


const GetUserTweetsContext = createContext(() => {});

export const useGetUserTweets = () => useContext(GetUserTweetsContext);

export const GetUserTweetsProvider = ({ children }) => {
  const navigate = useNavigate()
  const { currentMember } = useAuth()
  const [userInfo, setUserInfo] = useState({})
  const [userTweets, setUserTweets] = useState([])

  // const [tweetInputValue, setTweetInputValue] = useState('')
  // const [tweetModalValue, setTweetModalValue] = useState('')

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
    } catch (error) {
      console.error(error)
    }
    }
  }


  // const handleTweetInputChange = (value) => {
  //   setTweetInputValue(value)
  // }

  // const handleClickTweetInput = async () => {
  //   const wordCount = tweetInputValue.trim()
  //   if (wordCount.length === 0) {
  //     return
  //   }
  //   if (wordCount.length > 140) {
  //     return
  //   }
  //   try {
  //     await createTweet({ 
  //       description: tweetInputValue 
  //     })
  //     const tweets = await getTweets();
  //     setTweets(tweets)
  //   } catch (error) {
  //     console.error(error)
  //   }
  //   setTweetInputValue('')
  // }

  // const handleTweetModalChange = (value) => {
  //   setTweetModalValue(value)
  // }

  // const handleClickTweetModal = async () => {
  //   const wordCount = tweetModalValue.trim()
  //   if (wordCount.length === 0) {
  //     return
  //   }
  //   if (wordCount.length > 140) {
  //     return
  //   }
  //   try {
  //     await createTweet({ 
  //       description: tweetModalValue 
  //     })
  //     const tweets = await getTweets();
  //     setTweets(tweets)
  //   } catch (error) {
  //     console.error(error)
  //   }
  //   setTweetModalValue('')
  // }
  
  
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     const getTweetsAsync = async () => {
  //     try {
  //       const tweets = await getTweets();
  //       setTweets(tweets);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getTweetsAsync()
  // }
  // }, [isAuthenticated]);


  return (
    <GetUserTweetsContext.Provider 
    value={{userInfo, userTweets, handleAvatarClick}}>
      {children}
    </GetUserTweetsContext.Provider>
  );
};
