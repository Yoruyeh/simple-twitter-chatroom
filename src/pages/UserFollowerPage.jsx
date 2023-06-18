import styled from 'styled-components';
import MainLayout from '../layout/MainLayout'
import Tab from '../components/common/Tab'
import { UserHeader } from '../components/Header';
import FollowerCollection from '../components/FollowerCollection';
import { getUserFollowersById, getUserFollowingsById, Follow, UnFollow } from '../api/user.follower';
import { useLocation } from 'react-router-dom'
import { useGetUserTweets } from '../context/GetUserTweets';
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
const UserFollowerPage = () => {
 const {currentMemberInfo, currentMemberFollowers, setCurrentMemberFollowers, currentMemberFollowings, setCurrentMemberFollowings} = useGetUserTweets()
const { setPopularFollowers } = useGetTweets()
const pathname = useLocation().pathname

  const handleFollowClicked = async (id) => {
    if (currentMemberInfo.id === id) {
      return
    }
    try {
      await Follow({ 
        id: id 
      })
      const followers = await getUserFollowersById(currentMemberInfo.id);
      setCurrentMemberFollowers(followers)
      const followings = await getUserFollowingsById(currentMemberInfo.id)
      setCurrentMemberFollowings(followings)
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
      const followers = await getUserFollowersById(currentMemberInfo.id);
      setCurrentMemberFollowers(followers)
      const followings = await getUserFollowingsById(currentMemberInfo.id)
      setCurrentMemberFollowings(followings)
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
        <UserHeader />
      </div>
      <div className="user-follower-tab">
        <Tab />
      </div>
      <div className="user-follower-collection">
        {pathname.includes('followers') ? (
          <FollowerCollection currentMemberInfo={currentMemberInfo} userFollows={currentMemberFollowers} handleFollowClicked={handleFollowClicked} handleUnFollowClicked={handleUnFollowClicked}/>
        ) : (
          <FollowerCollection currentMember={currentMemberInfo} userFollows={currentMemberFollowings} handleFollowClicked={handleFollowClicked} handleUnFollowClicked={handleUnFollowClicked}/>
        )}
      </div>
      </StyledFollowerPageContainer>
    </MainLayout>
    )
}

export default UserFollowerPage