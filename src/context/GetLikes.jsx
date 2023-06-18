import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { getLikes, createLike, createUnLike } from '../api/like'
import { getTweets, getTweetById } from '../api/tweets';
import { useGetTweets } from './GetTweets';
import { useGetUserTweets } from './GetUserTweets';
import { getUserTweets } from '../api/other.users';
import { useGetSelectedTweet } from './GetSelectedTweet';
import { useLocation } from 'react-router-dom';

const GetLikesContext = createContext(() => {});

export const useGetLikes = () => useContext(GetLikesContext);

export const GetLikesProvider = ({ children }) => {
  const { isAuthenticated, currentMember } = useAuth()
  const [currentMemberLikes, setCurrentMemberLikes] = useState([])
  // const [userLikes, setUserLikes] = useState([])
  const {setTweets, setCurrentMemberTweets} = useGetTweets()
  const { setSelectedReplyItem } = useGetSelectedTweet()
  const {userInfo, setUserTweets} = useGetUserTweets()
  const pathname = useLocation().pathname

  const handleUnLikeAtHome = async (id) => {
    try {
      await createUnLike(id)
      const newArr = await getLikes(currentMember.id)
      setCurrentMemberLikes(newArr)
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
      setCurrentMemberLikes(newArr)
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
      setCurrentMemberLikes(newArr)
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
      setCurrentMemberLikes(newArr)
      const tweet = await getTweetById(id)
      setSelectedReplyItem(tweet)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUnLikeAtUser = async (id) => {
    if (pathname.includes(currentMember.id)) {
    try {
      await createUnLike(id)
      const newArr = await getLikes(currentMember.id)
      setCurrentMemberLikes(newArr)
      const tweets = await getUserTweets(currentMember.id)
      setCurrentMemberTweets(tweets)
    } catch (error) {
      console.error(error)
    }
  } else {
    try {
      await createUnLike(id)
      const newArr = await getLikes(currentMember.id)
      setCurrentMemberLikes(newArr)
      const tweets = await getUserTweets(userInfo.id)
      setUserTweets(tweets)
    } catch (error) {
      console.error(error)
    }
  }
  }

  const handleLikeAtUser = async (id) => {
    if (pathname.includes(currentMember.id)) {
    try {
      await createLike(id)
      const newArr = await getLikes(currentMember.id)
      setCurrentMemberLikes(newArr)
      const tweets = await getUserTweets(currentMember.id)
      setCurrentMemberTweets(tweets)
    } catch (error) {
      console.error(error)
    }
  } else {
    try {
      await createLike(id)
      const newArr = await getLikes(currentMember.id)
      setCurrentMemberLikes(newArr)
      const tweets = await getUserTweets(userInfo.id)
      setUserTweets(tweets)
    } catch (error) {
      console.error(error)
    }
  }
  }

  
  useEffect(() => {
    if (isAuthenticated) {
      const getLikesAsync = async () => {
      try {
        const likes = await getLikes(currentMember.id);
        if (likes) {
          // setUserLikes(likes);
          setCurrentMemberLikes(likes)
        } else {
          return
        }
      } catch (error) {
        console.error(error);
      }
    }
    getLikesAsync()
  }
  }, [isAuthenticated, currentMember]);


  return (
    <GetLikesContext.Provider 
    value={{handleUnLikeAtHome, handleLikeAtHome, handleUnLikeAtUser, handleLikeAtUser, handleUnLikeAtReply, handleLikeAtReply, currentMemberLikes}}>
      {children}
    </GetLikesContext.Provider>
  );
};
