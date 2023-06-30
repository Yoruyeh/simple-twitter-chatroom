import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getUserInfo,
  getUserTweets,
  getUserReplies,
  getUserLikes,
} from '../api/other.users';
import { useAuth } from './AuthContext';
import {
  getUserFollowersById,
  getUserFollowingsById,
} from '../api/user.follower';
import { getTweetById } from '../api/tweets';
import { useGetSelectedTweet } from './GetSelectedTweet';


const GetUserTweetsContext = createContext(() => {});

export const useGetUserTweets = () => useContext(GetUserTweetsContext);

export const GetUserTweetsProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setSelectedReplyItem, setIsModalLoading, setOpenReplyModal } =
    useGetSelectedTweet();
  const { currentMember, isAuthenticated } = useAuth();
  const [currentMemberInfo, setCurrentMemberInfo] = useState({});
  const [currentMemberFollowers, setCurrentMemberFollowers] = useState([]);
  const [currentMemberFollowings, setCurrentMemberFollowings] = useState([]);

  const [userInfo, setUserInfo] = useState({});
  const [userTweets, setUserTweets] = useState([]);
  const [userReplies, setUserReplies] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [userfollowers, setUserFollowers] = useState([])
  const [userfollowings, setUserFollowings] = useState([])


  const handleAvatarClick = async (id) => {
    try {
      if (currentMember.id === Number(id)) {
        navigate(`/${id}`);
      } else {
        const info = await getUserInfo(id);
        setUserInfo(info);
        localStorage.setItem('userInfo', JSON.stringify(info));
        const tweets = await getUserTweets(id);
        setUserTweets(tweets);
        navigate(`/others/${id}`);
        const replies = await getUserReplies(id);
        setUserReplies(replies);
        const likes = await getUserLikes(id);
        setUserLikes(likes);
        const followers = await getUserFollowersById(id)
        setUserFollowers(followers)
        const followings = await getUserFollowingsById(id);
        setUserFollowings(followings);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplyIconClickedAtOther = async (id) => {
    setOpenReplyModal(true);
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
    if (isAuthenticated) {
      const getUserInfoAsync = async () => {
        try {
          const info = await getUserInfo(currentMember.id);
          setCurrentMemberInfo(info);
        } catch (error) {
          console.error(error);
        }
      };
      getUserInfoAsync();
      const getUserFollowersByIdAsync = async () => {
        try {
          const userFollowers = await getUserFollowersById(currentMember.id);
          if(userFollowers) {
            setCurrentMemberFollowers(userFollowers);
          } else {
            return
          }
        } catch (error) {
          console.error(error);
        }
      };
      getUserFollowersByIdAsync();
      const getUserFollowingsByIdAsync = async () => {
        try {
          const userFollowings = await getUserFollowingsById(currentMember.id);
          if(userFollowings) {
            setCurrentMemberFollowings(userFollowings);
          } else {
            return
          }
        } catch (error) {
          console.error(error);
        }
      };
      getUserFollowingsByIdAsync();
    }
  }, [isAuthenticated, currentMember]);



  return (
    <GetUserTweetsContext.Provider
      value={{
        userInfo,
        setUserInfo,
        userTweets,
        handleAvatarClick,
        userReplies,
        userLikes,
        currentMemberInfo,
        currentMemberFollowers,
        setCurrentMemberFollowers,
        currentMemberFollowings,
        setCurrentMemberFollowings,
        handleReplyIconClickedAtOther,
        setUserTweets,
        setCurrentMemberInfo,
        userfollowers, userfollowings, setUserFollowers, setUserFollowings,
        setUserReplies, setUserLikes
      }}
    >
      {children}
    </GetUserTweetsContext.Provider>
  );
};