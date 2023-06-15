import styled from 'styled-components';
import MainLayout from '../layout/MainLayout'
import Tab from '../components/common/Tab'
import { OtherUserHeader } from '../components/Header';
import FollowerCollection from '../components/FollowerCollection';
import { Follow, UnFollow } from '../api/user.follower';
import { useLocation } from 'react-router-dom'
import { useGetUserTweets } from '../context/GetUserTweets';
import { useAuth } from '../context/AuthContext';


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
  const { userInfo, userFollowers, userFollowings } = useGetUserTweets()
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

 
  return (
    <MainLayout>
      <StyledFollowerPageContainer>
      <div className="header">
        <OtherUserHeader userInfo={userInfo} />
      </div>
      <div className="user-follower-tab">
        <Tab />
      </div>
      <div className="user-follower-collection">
        {pathname.includes('followers') ? (
          <FollowerCollection userFollows={userFollowers} handleFollowClicked={handleFollowClicked} handleUnFollowClicked={handleUnFollowClicked}/>
        ) : (
          <FollowerCollection userFollows={userFollowings} handleFollowClicked={handleFollowClicked} handleUnFollowClicked={handleUnFollowClicked}/>
        )}
      </div>
      </StyledFollowerPageContainer>
    </MainLayout>
    )
}

export default OtherUserFollowerPage