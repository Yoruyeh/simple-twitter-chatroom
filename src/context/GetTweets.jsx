import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { getTweets, createTweet } from '../api/tweets'
import { getUserTweets } from '../api/other.users'
import { getPopularFollowers } from '../api/popular.follower'

const GetTweetsContext = createContext(() => {});

export const useGetTweets = () => useContext(GetTweetsContext);

export const GetTweetsProvider = ({ children }) => {
  const { isAuthenticated, currentMember } = useAuth()
  const [tweets, setTweets] = useState([])
  const [currentMemberTweets, setCurrentMemberTweets] = useState([])
  const [tweetInputValue, setTweetInputValue] = useState('')
  const [tweetModalValue, setTweetModalValue] = useState('')
  const [openTweetModal, setOpenTweetModal] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertType, setAlertType] = useState(null)
  const [popularFollowers, setPopularFollowers] = useState([]);

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
        const userTweets = await getUserTweets(currentMember.id)
        if (userTweets) {
          setCurrentMemberTweets(userTweets);
        } else {
          return
        }
      } catch (error) {
        console.error(error);
      }
    }
    getTweetsAsync()
    const getPopularFollowersAsync = async () => {
      try {
        const popularObject = await getPopularFollowers();
        const populars = popularObject.users;
        setPopularFollowers(populars);
      } catch (error) {
        console.error(error);
      }
    }
    getPopularFollowersAsync()
  }
  }, [isAuthenticated, currentMember]);


  return (
    <GetTweetsContext.Provider 
    value={{tweets, setTweets, handleTweetInputChange, handleClickTweetInput, tweetInputValue, handleTweetModalChange, handleClickTweetModal, tweetModalValue, openAlert, setOpenAlert, alertType, setAlertType, handleOpenTweetModal, openTweetModal, setOpenTweetModal, setTweetModalValue, setTweetInputValue, currentMemberTweets, setCurrentMemberTweets, popularFollowers, setPopularFollowers}}>
      {children}
    </GetTweetsContext.Provider>
  );
};
