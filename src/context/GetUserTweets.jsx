import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserInfo, getUserTweets, getUserReplies, getUserLikes } from '../api/other.users'
import { useAuth } from './AuthContext';
import { getUserFollowersById, getUserFollowingsById } from '../api/user.follower';



const GetUserTweetsContext = createContext(() => {});

export const useGetUserTweets = () => useContext(GetUserTweetsContext);

export const GetUserTweetsProvider = ({ children }) => {
  const navigate = useNavigate()
  const { currentMember } = useAuth()
  const [currentMemberInfo, setCurrentMemberInfo] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [userTweets, setUserTweets] = useState([])
  const [userReplies, setUserReplies] = useState([])
  const [userLikes, setUserLikes] = useState([])
  const [userfollowers, setUserFollowers] = useState([])
  const [userfollowings, setUserFollowings] = useState([])


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
      const followers = await getUserFollowersById(id)
      console.log(followers)
      setUserFollowers(followers)
      const followings = await getUserFollowingsById(id)
      setUserFollowings(followings)
    } catch (error) {
      console.error(error)
    }
  }

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
  }, [currentMember])


  return (
    <GetUserTweetsContext.Provider 
    value={{userInfo, userTweets, handleAvatarClick, userReplies, userLikes, userfollowers, userfollowings, setUserFollowers, setUserFollowings, currentMemberInfo}}>
      {children}
    </GetUserTweetsContext.Provider>
  );
};
