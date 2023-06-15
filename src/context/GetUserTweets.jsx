import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserInfo, getUserTweets, getUserReplies, getUserLikes } from '../api/other.users'
import { useAuth } from './AuthContext';
import { getUserFollowersById, getUserFollowingsById } from '../api/user.follower';
import { getTweetById } from '../api/tweets'
import { useGetSelectedTweet } from './GetSelectedTweet';


const GetUserTweetsContext = createContext(() => {});

export const useGetUserTweets = () => useContext(GetUserTweetsContext);

export const GetUserTweetsProvider = ({ children }) => {
  const navigate = useNavigate()
  const { setSelectedReplyItem, setIsModalLoading } = useGetSelectedTweet()
  const { currentMember } = useAuth()
  const [currentMemberInfo, setCurrentMemberInfo] = useState({})
  const [currentMemberFollowers, setCurrentMemberFollowers] = useState([]);
  const [currentMemberFollowings, setCurrentMemberFollowings]  = useState([])
  const [userInfo, setUserInfo] = useState({})
  const [userTweets, setUserTweets] = useState([])
  const [userReplies, setUserReplies] = useState([])
  const [userLikes, setUserLikes] = useState([])


  const handleAvatarClick = async (id) => {
    try {
      const info = await getUserInfo(id)
      setUserInfo(info)
      const tweets = await getUserTweets(id)
      setUserTweets(tweets)
       if (currentMember.id === Number(id)) {
        navigate(`/${id}`)
      } else {
        navigate(`/others/${id}`)
      }
      const replies = await getUserReplies(id)
      setUserReplies(replies)
      const likes = await getUserLikes(id)
      setUserLikes(likes)
    } catch (error) {
      console.error(error)
    }
  }

  const handleReplyIconClickedAtOther = async (id) => {
    setIsModalLoading(true);
    try {
      const tweet = await getTweetById(id);
      setSelectedReplyItem(tweet);
      setIsModalLoading(false);
      navigate(`/others/${userInfo.id}/tweets/${id}/reply`);
    } catch (error) {
      console.error(error);
      setIsModalLoading(false);
    }
  };

  useEffect(() => {
    const getUserInfoAsync = async () => {
      try {
        const info = await getUserInfo(currentMember.id);
        setCurrentMemberInfo(info);
      } catch (error) {
        console.error(error);
      }
    }
    getUserInfoAsync()
    const getUserFollowersByIdAsync = async () => {
      try {
        const followers = await getUserFollowersById(currentMember.id);
        setCurrentMemberFollowers(followers);
      } catch (error) {
        console.error(error);
      }
    }
    getUserFollowersByIdAsync()
    const getUserFollowingsByIdAsync = async () => {
      try {
        const followings = await getUserFollowingsById(currentMember.id);
        setCurrentMemberFollowings(followings);
      } catch (error) {
        console.error(error);
      }
    }
    getUserFollowingsByIdAsync()
  }, [currentMember])


  return (
    <GetUserTweetsContext.Provider 
    value={{userInfo, userTweets, handleAvatarClick, userReplies, userLikes, currentMemberInfo, currentMemberFollowers, setCurrentMemberFollowers, currentMemberFollowings, setCurrentMemberFollowings, handleReplyIconClickedAtOther}}>
      {children}
    </GetUserTweetsContext.Provider>
  );
};
