import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { getLikes, createLike, createUnLike } from '../api/like'
import { getTweets, getTweetById } from '../api/tweets';
import { useGetTweets } from './GetTweets';
import { useGetUserTweets } from './GetUserTweets';
import { getUserTweets } from '../api/other.users';
import { useGetSelectedTweet } from './GetSelectedTweet';

const GetLikesContext = createContext(() => {});

export const useGetLikes = () => useContext(GetLikesContext);

export const GetLikesProvider = ({ children }) => {
  const { isAuthenticated, currentMember } = useAuth()
  const [userLikes, setUserLikes] = useState([])
  const {setTweets} = useGetTweets()
  const { setSelectedReplyItem } = useGetSelectedTweet()
  const {userInfo, setUserTweets} = useGetUserTweets()

  const handleUnLikeAtHome = async (id) => {
    try {
      await createUnLike(id)
      const newArr = await getLikes(currentMember.id)
      setUserLikes(newArr)
      const tweets = await getTweets()
      setTweets(tweets)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLikeAtHome = async (id) => {
    try {
      await createLike(id)
      const newArr = await getLikes(currentMember.id)
      setUserLikes(newArr)
      const tweets = await getTweets()
      setTweets(tweets)
    } catch (error) {
      console.error(error)
    }
  }

   const handleUnLikeAtReply = async (id) => {
    try {
      await createUnLike(id)
      const newArr = await getLikes(currentMember.id)
      setUserLikes(newArr)
      const tweet = await getTweetById(id)
      setSelectedReplyItem(tweet)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLikeAtReply = async (id) => {
    try {
      await createLike(id)
      const newArr = await getLikes(currentMember.id)
      setUserLikes(newArr)
      const tweet = await getTweetById(id)
      setSelectedReplyItem(tweet)
    } catch (error) {
      console.error(error)
    }
  }

    const handleUnLikeAtUser = async (id) => {
    try {
      await createUnLike(id)
      const newArr = await getLikes(currentMember.id)
      setUserLikes(newArr)
      const tweets = await getUserTweets(userInfo.id)
      setUserTweets(tweets)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLikeAtUser = async (id) => {
    try {
      await createLike(id)
      const newArr = await getLikes(currentMember.id)
      setUserLikes(newArr)
      const tweets = await getUserTweets(userInfo.id)
      setUserTweets(tweets)
    } catch (error) {
      console.error(error)
    }
  }

  
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
    value={{userLikes, handleUnLikeAtHome, handleLikeAtHome, handleUnLikeAtUser, handleLikeAtUser, handleUnLikeAtReply, handleLikeAtReply}}>
      {children}
    </GetLikesContext.Provider>
  );
};
