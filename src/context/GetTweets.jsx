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
  const [openTweetModal, setOpenTweetModal] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertType, setAlertType] = useState(null)

  const handleTweetInputChange = (value) => {
    setTweetInputValue(value)
  }

  const handleOpenTweetModal = () => {
    setOpenTweetModal(!openTweetModal)
  }

  const handleClickTweetInput = async () => {
    const wordCount = tweetInputValue.trim()
    if (wordCount.length === 0) {
      return
    }
    if (wordCount.length > 140) {
      return
    }
    setOpenAlert(true)
    setAlertType('success')
    try {
      await createTweet({ 
        description: tweetInputValue 
      })
      const tweets = await getTweets();
      setTweets(tweets)
      setOpenAlert(false)
    } catch (error) {
      console.error(error)
    }
    setTweetInputValue('')
  }

  const handleTweetModalChange = (value) => {
    setTweetModalValue(value)
  }

  const handleClickTweetModal = async () => {
    setOpenTweetModal(true)
    const wordCount = tweetModalValue.trim()
    if (wordCount.length === 0) {
      return
    }
    if (wordCount.length > 140) {
      return
    }
    setOpenTweetModal(false)
    setOpenAlert(true)
    setAlertType('success')
    try {
      await createTweet({ 
        description: tweetModalValue 
      })
      const tweets = await getTweets();
      setTweets(tweets)
      setOpenAlert(false)
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
    value={{tweets, setTweets, handleTweetInputChange, handleClickTweetInput, tweetInputValue, handleTweetModalChange, handleClickTweetModal, tweetModalValue, openAlert, setOpenAlert, alertType, setAlertType, handleOpenTweetModal, openTweetModal, setOpenTweetModal, setTweetModalValue, setTweetInputValue}}>
      {children}
    </GetTweetsContext.Provider>
  );
};
