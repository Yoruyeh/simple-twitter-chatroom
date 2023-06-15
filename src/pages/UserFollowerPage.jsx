import styled from 'styled-components';
import { useState, useEffect } from 'react';
import MainLayout from '../layout/MainLayout'
import Tab from '../components/common/Tab'
import { UserHeader } from '../components/Header';
import FollowerCollection from '../components/FollowerCollection';
import { useAuth } from '../context/AuthContext';
import { getUserFollowersById, getUserFollowingsById, Follow, UnFollow } from '../api/user.follower';
import { useLocation } from 'react-router-dom'
import { useGetUserTweets } from '../context/GetUserTweets';


const StyledFollowerPageContainer = styled.div`
  width: 100%;
  height: 100%;
  .tweet-content-container {
    border-bottom: 1px solid var(--gray1);
  }
  .follow-item-wrapper {
    border-bottom: 1px solid var(--gray1);
  }
`
const UserFollowerPage = () => {
  const { currentMember } = useAuth()
  const { userInfo } = useGetUserTweets()
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings]  = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const pathname = useLocation().pathname

  const handleFollowClicked = async (id) => {
    if (currentMember.id === id) {
      return
    }
    try {
      await Follow({ 
        id: id 
      })
      const followers = await getUserFollowersById(currentMember.id);
      setUserFollowers(followers)
      const followings = await getUserFollowingsById(currentMember.id)
      setUserFollowings(followings)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUnFollowClicked = async (id) => {
    try {
      await UnFollow(id)
      const followers = await getUserFollowersById(currentMember.id);
      setUserFollowers(followers)
      const followings = await getUserFollowingsById(currentMember.id)
      setUserFollowings(followings)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    if (pathname.includes('followers')) {
      if(pathname.includes('others')) {
        const getUserFollowersAsync = async () => {
          try {
            const followers = await getUserFollowersById(userInfo.id);
            setUserFollowers(followers)
          } catch (error) {
            console.error(error);
          }
        };
        getUserFollowersAsync(); 
      } else {
        const getUserFollowersAsync = async () => {
          try {
            const followers = await getUserFollowersById(currentMember.id);
            setUserFollowers(followers)
          } catch (error) {
            console.error(error);
          }
        };
        getUserFollowersAsync(); 
      }
    setIsLoading(false)
    }

    if (pathname.includes('followings')) {
      if(pathname.includes('others')) {
        const getUserFollowingsAsync = async () => {
          try {
            const followings = await getUserFollowersById(userInfo.id);
            setUserFollowers(followings)
          } catch (error) {
            console.error(error);
          }
        };
        getUserFollowingsAsync(); 
      } else {
        const getUserFollowingsAsync = async () => {
          try {
            const followings = await getUserFollowersById(currentMember.id);
            setUserFollowers(followings)
          } catch (error) {
            console.error(error);
          }
        };
        getUserFollowingsAsync(); 
      }
    setIsLoading(false)
    }
  }, [currentMember, pathname, userInfo]);

 
  return (
    !isLoading && (
    <MainLayout>
      <StyledFollowerPageContainer>
      <div className="header">
        <UserHeader />
      </div>
      <div className="user-follower-tab">
        <Tab />
      </div>
      <div className="user-follower-collection">
        {pathname.includes('followers') ? (
          <FollowerCollection currentMember={currentMember} userFollows={userFollowers} handleFollowClicked={handleFollowClicked} handleUnFollowClicked={handleUnFollowClicked}/>
        ) : (
          <FollowerCollection currentMember={currentMember} userFollows={userFollowings} handleFollowClicked={handleFollowClicked} handleUnFollowClicked={handleUnFollowClicked}/>
        )}
      </div>
      </StyledFollowerPageContainer>
    </MainLayout>)
  )
}

export default UserFollowerPage