import styled from 'styled-components';
import { useState, useEffect } from 'react';
import MainLayout from '../layout/MainLayout'
import Tab from '../components/common/Tab'
import { UserHeader } from '../components/Header';
import FollowerCollection from '../components/FollowerCollection';
import { useAuth } from '../context/AuthContext';
import { getUserFollowersById, getUserFollowingsById, Follow, UnFollow } from '../api/user.follower';
import { useLocation } from 'react-router-dom'


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
      const getUserFollowersAsync = async () => {
      try {
        const followers = await getUserFollowersById(currentMember.id);
        setUserFollowers(followers)
      } catch (error) {
        console.error(error);
      }
    };
    getUserFollowersAsync(); 
    setIsLoading(false)
    }

    if (pathname.includes('followings')) {
      const getUserFollowingsByIdAsync = async () => {
        try {
          const followings = await getUserFollowingsById(currentMember.id)
          setUserFollowings(followings)
        } catch (error) {
          console.error(error)
        }
      }
      getUserFollowingsByIdAsync()
      setIsLoading(false)
    }
  }, [currentMember, pathname]);

 
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
          <FollowerCollection currentMember={currentMember} userFollows={userFollowers}/>
        ) : (
          <FollowerCollection currentMember={currentMember} userFollows={userFollowings}/>
        )}
      </div>
      </StyledFollowerPageContainer>
    </MainLayout>)
  )
}

export default UserFollowerPage