import styled from 'styled-components';
import MainLayout from '../layout/MainLayout'
import Tab from '../components/common/Tab'
import { OtherUserHeader } from '../components/Header';
import FollowerCollection from '../components/FollowerCollection';
import { Follow, UnFollow } from '../api/user.follower';
import { useLocation } from 'react-router-dom'
import { useGetUserTweets } from '../context/GetUserTweets';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { getUserFollowersById, getUserFollowingsById } from '../api/user.follower';


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
const OtherUserFollowerPage = () => {
  const { currentMember } = useAuth()
  const { userInfo } = useGetUserTweets()
  const [userfollowers, setUserFollowers] = useState([])
  const [userfollowings, setUserFollowings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const pathname = useLocation().pathname

  const handleFollowClicked = async (id) => {
    if (currentMember.id === id) {
      return
    }
    try {
      await Follow({ 
        id: id 
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleUnFollowClicked = async (id) => {
    try {
      await UnFollow(id)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const getUserFollowersByIdAsync = async () => {
      try {
        const followers = await getUserFollowersById(userInfo.id);
        setUserFollowers(followers);
      } catch (error) {
        console.error(error);
      }
    }
    getUserFollowersByIdAsync()
    const getUserFollowingsByIdAsync = async () => {
      try {
        const followings = await getUserFollowingsById(userInfo.id);
        setUserFollowings(followings);
      } catch (error) {
        console.error(error);
      }
    }
    getUserFollowingsByIdAsync()
    setIsLoading(false)
  }, [userInfo])

  return (
    !isLoading && (
    <MainLayout>
      <StyledFollowerPageContainer>
      <div className="header">
        <OtherUserHeader userInfo={userInfo} />
      </div>
      <div className="user-follower-tab">
        <Tab />
      </div>
      <div className="user-follower-collection">
        {userfollowers && pathname.includes('followers') ? (
          <FollowerCollection userFollows={userfollowers} handleFollowClicked={handleFollowClicked} handleUnFollowClicked={handleUnFollowClicked}/>
        ) : (
          userfollowings && <FollowerCollection userFollows={userfollowings} handleFollowClicked={handleFollowClicked} handleUnFollowClicked={handleUnFollowClicked}/>
        )}
      </div>
      </StyledFollowerPageContainer>
    </MainLayout>
    )
  )
}

export default OtherUserFollowerPage