import styled from 'styled-components';
import MainLayout from '../layout/MainLayout'
import Tab from '../components/common/Tab'
import { UserHeader } from '../components/Header';
import FollowerCollection from '../components/FollowerCollection';

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
        <FollowerCollection />
      </div>
      </StyledFollowerPageContainer>
    </MainLayout>
  )
}

export default UserFollowerPage