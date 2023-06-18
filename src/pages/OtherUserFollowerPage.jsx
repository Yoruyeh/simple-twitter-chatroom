import styled from 'styled-components';
import MainLayout from '../layout/MainLayout'
import Tab from '../components/common/Tab'
import { OtherUserHeader } from '../components/Header';
import FollowerCollection from '../components/FollowerCollection';
import { Follow, UnFollow } from '../api/user.follower';
import { useLocation } from 'react-router-dom'
import { useGetUserTweets } from '../context/GetUserTweets';
import { useAuth } from '../context/AuthContext';
import { getUserFollowersById, getUserFollowingsById } from '../api/user.follower';
import { useGetTweets } from '../context/GetTweets'
import { getPopularFollowers } from '../api/popular.follower'


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
  const { userInfo, userfollowers, userfollowings, setUserFollowers, setUserFollowings } = useGetUserTweets()
  const { setPopularFollowers } = useGetTweets()
  const pathname = useLocation().pathname
   const {currentMemberInfo,  setCurrentMemberFollowings} = useGetUserTweets()

  const handleFollowClicked = async (id) => {
    if (currentMember.id === id) {
      return
    }
    try {
      await Follow({ 
        id: id 
      })
      const followings = await getUserFollowingsById(currentMemberInfo.id)
      setCurrentMemberFollowings(followings)
      const followers = await getUserFollowersById(userInfo.id)
      setUserFollowers(followers)
      const followerings = await getUserFollowingsById(userInfo.id)
      setUserFollowings(followerings)
      const popularObject = await getPopularFollowers();
      const populars = popularObject.users;
      setPopularFollowers(populars)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUnFollowClicked = async (id) => {
    try {
      await UnFollow(id)
      const followings = await getUserFollowingsById(currentMemberInfo.id)
      setCurrentMemberFollowings(followings)
      const followers = await getUserFollowersById(userInfo.id)
      setUserFollowers(followers)
      const followerings = await getUserFollowingsById(userInfo.id)
      setUserFollowings(followerings)
      const popularObject = await getPopularFollowers();
      const populars = popularObject.users;
      setPopularFollowers(populars)
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
        {userfollowers && pathname.includes('followers') ? (
          <FollowerCollection userFollows={userfollowers} handleFollowClicked={handleFollowClicked} handleUnFollowClicked={handleUnFollowClicked}/>
        ) : (
          userfollowings && <FollowerCollection userFollows={userfollowings} handleFollowClicked={handleFollowClicked} handleUnFollowClicked={handleUnFollowClicked}/>
        )}
      </div>
      </StyledFollowerPageContainer>
    </MainLayout>
    )
}

export default OtherUserFollowerPage