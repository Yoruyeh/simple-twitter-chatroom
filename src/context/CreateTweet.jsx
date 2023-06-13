import { createContext, useContext, useState, useEffect } from 'react'
import { getTweets, createTweet } from '../api/tweets';
import { useAuth } from '../context/AuthContext'

const CreateTweetContext = createContext(() => {});

export const useCreateTweet = () => useContext(CreateTweetContext);

export const CreateTweetProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [tweets, setTweets] = useState([])
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
    }
  }, [isAuthenticated]);


  return (
    <CreateTweetContext.Provider 
    value={{tweets, handleTweetInputChange, handleClickTweetInput, tweetInputValue, handleTweetModalChange, tweetModalValue, handleClickTweetModal}}>
      {children}
    </CreateTweetContext.Provider>
  );
};
