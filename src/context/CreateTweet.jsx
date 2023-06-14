import { createContext, useContext, useState, useEffect } from 'react'
import { getTweets, createTweet } from '../api/tweets';
import { useAuth } from '../context/AuthContext'
import { getLikes, createLike, createUnLike } from '../api/like';

const CreateTweetContext = createContext(() => {});

export const useCreateTweet = () => useContext(CreateTweetContext);

export const CreateTweetProvider = ({ children }) => {
  const { isAuthenticated, currentMember } = useAuth()
  const [tweets, setTweets] = useState([])
  const [userLikesArr, setUserLikeArr] = useState([])
  // const [updatedUserLikesArr, setUpdatedUserLikesArr] = useState([])
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
    const result = await getLikes(currentMember.id);
    setUserLikeArr(result)
  }

  const handleLikeAtHome = async (id) => {
    try {
      await createLike(id)
    } catch (error) {
      console.error(error)
    }
    const result = await getLikes(currentMember.id);
    setUserLikeArr(result)
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
    value={{tweets, handleTweetInputChange, handleClickTweetInput, tweetInputValue, handleTweetModalChange, tweetModalValue, handleClickTweetModal, userLikesArr, isLoading, handleLikeAtHome, handleUnLikeAtHome}}>
      {children}
    </CreateTweetContext.Provider>
  );
};
