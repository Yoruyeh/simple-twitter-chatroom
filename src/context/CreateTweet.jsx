import { createContext, useContext, useState, useEffect } from 'react'
import { getTweets, createTweet, getTweetById } from '../api/tweets';
import { useAuth } from '../context/AuthContext'
import { getLikes, createLike, createUnLike } from '../api/like';
import { useGetTheTweet } from './GetTweetAndReplies';

const CreateTweetContext = createContext(() => {});

export const useCreateTweet = () => useContext(CreateTweetContext);

export const CreateTweetProvider = ({ children }) => {
  const { isAuthenticated, currentMember } = useAuth()
  const { setUpdatedTweets, setSelectedTweetItem } = useGetTheTweet()
  const [tweets, setTweets] = useState([])
  const [userLikesArr, setUserLikeArr] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [tweetInputValue, setTweetInputValue] = useState('')
  const [tweetModalValue, setTweetModalValue] = useState('')

  
  const handleTweetInputChange = (value) => {
    setTweetInputValue(value)
  }
  const handleTweetModalChange = (value) => {
    setTweetModalValue(value)
  }

  const handleClickTweetInput = async () => {
    if(tweetInputValue.length === 0) {
      return
    }
    try {
      await createTweet({ 
        description: tweetInputValue 
      })
      const tweets = await getTweets();
      setTweets(tweets)
    } catch (error) {
      console.error(error)
    }
    setTweetInputValue('')
  }

  const handleClickTweetModal = async () => {
    if(tweetModalValue.length === 0 || tweetModalValue.length > 140) {
      return
    }
    try {
      await createTweet({ 
        description: tweetModalValue 
      })
      const tweets = await getTweets();
      setTweets(tweets)
    } catch (error) {
      console.error(error)
    }
    setTweetModalValue('')
  }

  const handleUnLikeAtHome = async (id) => {
    try {
      await createUnLike(id)
    } catch (error) {
      console.error(error)
    }
    const tweets = await getTweets()
    setUpdatedTweets(tweets)
    const likes = await getLikes(currentMember.id);
    setUserLikeArr(likes)
  }

  const handleLikeAtHome = async (id) => {
    try {
      await createLike(id)
    } catch (error) {
      console.error(error)
    }
    const tweets = await getTweets()
    setUpdatedTweets(tweets)
    const likes = await getLikes(currentMember.id);
    setUserLikeArr(likes)
  }

  const handleUnLikeAtReply = async (id) => {
    try {
      await createUnLike(id)
    } catch (error) {
      console.error(error)
    }
    const tweet = await getTweetById(id)
    setSelectedTweetItem(tweet)
    const likes = await getLikes(currentMember.id);
    setUserLikeArr(likes)
  }

  const handleLikeAtReply = async (id) => {
    try {
      await createLike(id)
    } catch (error) {
      console.error(error)
    }
    const tweet = await getTweetById(id)
    setSelectedTweetItem(tweet)
    const likes = await getLikes(currentMember.id);
    setUserLikeArr(likes)
  }

  
  useEffect(() => {
    if (isAuthenticated) {
      const getTweetsAsync = async () => {
      try {
        const tweets = await getTweets();
        setTweets(tweets);
      } catch (error) {
        console.error(error);
      }
    };
    getTweetsAsync();
    const getUserLikesAsyn = async () => {
      try {
        const result = await getLikes(currentMember.id)
        setUserLikeArr(result)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    getUserLikesAsyn()
    }
  }, [isAuthenticated, currentMember]);


  return (
    <CreateTweetContext.Provider 
    value={{tweets, handleTweetInputChange, handleClickTweetInput, tweetInputValue, handleTweetModalChange, tweetModalValue, handleClickTweetModal, userLikesArr, isLoading, handleLikeAtHome, handleUnLikeAtHome, handleUnLikeAtReply, handleLikeAtReply, setTweetModalValue}}>
      {children}
    </CreateTweetContext.Provider>
  );
};
