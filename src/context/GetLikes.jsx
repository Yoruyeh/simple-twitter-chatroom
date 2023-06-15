import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { getLikes, createLike, createUnLike } from '../api/like'

const GetLikesContext = createContext(() => {});

export const useGetLikes = () => useContext(GetLikesContext);

export const GetLikesProvider = ({ children }) => {
  const { isAuthenticated, currentMember } = useAuth()
  const [userLikes, setUserLikes] = useState([])
  // const [tweets, setTweets] = useState([])
  // const [tweetInputValue, setTweetInputValue] = useState('')
  // const [tweetModalValue, setTweetModalValue] = useState('')

  const handleUnLike = async (id) => {
    try {
      await createUnLike(id)
      const newArr = await getLikes(currentMember.id)
      setUserLikes(newArr)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLike = async (id) => {
    try {
      await createLike(id)
      const newArr = await getLikes(currentMember.id)
      setUserLikes(newArr)
    } catch (error) {
      console.error(error)
    }
  }

  // const handleTweetInputChange = (value) => {
  //   setTweetInputValue(value)
  // }

  // const handleClickTweetInput = async () => {
  //   if (tweetInputValue.length === 0) {
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
  //   if(tweetModalValue.length === 0 || tweetModalValue.length > 140) {
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
  
  
  useEffect(() => {
    if (isAuthenticated) {
      const getLikesAsync = async () => {
      try {
        const likes = await getLikes(currentMember.id);
        setUserLikes(likes);
      } catch (error) {
        console.error(error);
      }
    }
    getLikesAsync()
  }
  }, [isAuthenticated, currentMember]);


  return (
    <GetLikesContext.Provider 
    value={{userLikes, handleUnLike, handleLike}}>
      {children}
    </GetLikesContext.Provider>
  );
};
