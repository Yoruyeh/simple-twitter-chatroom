import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { getTweets, createTweet } from '../api/tweets'


const GetTweetsContext = createContext(() => {});

export const useGetTweets = () => useContext(GetTweetsContext);

export const GetTweetsProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [tweets, setTweets] = useState([])
  const [tweetInputValue, setTweetInputValue] = useState('')
  const [tweetModalValue, setTweetModalValue] = useState('')

  const handleTweetInputChange = (value) => {
    setTweetInputValue(value)
  }

  const handleClickTweetInput = async () => {
    if (tweetInputValue.length === 0) {
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

  const handleTweetModalChange = (value) => {
    setTweetModalValue(value)
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
  
  
  useEffect(() => {
    if (isAuthenticated) {
      const getTweetsAsync = async () => {
      try {
        const tweets = await getTweets();
        setTweets(tweets);
      } catch (error) {
        console.error(error);
      }
    }
    getTweetsAsync()
  }
  }, [isAuthenticated]);


  return (
    <GetTweetsContext.Provider 
    value={{tweets, setTweets, handleTweetInputChange, handleClickTweetInput, tweetInputValue, handleTweetModalChange, handleClickTweetModal, tweetModalValue}}>
      {children}
    </GetTweetsContext.Provider>
  );
};
