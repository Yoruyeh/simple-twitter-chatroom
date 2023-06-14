import styled from 'styled-components';
import { FollowButton } from './common/button.styled';

const StyledFollowerItemContainer = styled.div`
  font-family: 'Noto Sans TC', sans-serif;
  width: 100%;
  height: 100%;
  color: var(--dark-100);
  font-size: 16px;
  display: flex;
  flex-direction: column;
  position: relative;

  .user-follower-name {
    margin: 28px 30px 4px 82px;
  }

  .user-follower-info {
    margin: 10px 30px 16px 82px;
    height: 100%;
    line-height: 26px;
  }

  .user-follower-button {
    position: absolute;
    top: 16px;
    right: 30px;
  }
`;

const StyledAvatar = styled.div`
  background-image: url(${(props) => (props.image ? props.image : '')});
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 16px;
  left: 24px;
`;


const FollowerItem = ({ follow, followed, handleFollowClicked, handleUnFollowClicked }) => {
  return (
    <StyledFollowerItemContainer>
      <StyledAvatar image={follow.avatar} />
        <h6 className="user-follower-name">{follow.name}</h6>
        <div className="user-follower-info">
          {follow.introduction}
        </div>
        {!followed ? (
        <FollowButton className="user-follower-button unfollowed" data-id={follow.followerId || follow.followingId}
        onClick={(e) => {
          const followClickedId = e.currentTarget.dataset.id
          handleFollowClicked(followClickedId)
        }}>跟隨</FollowButton>
        ) 
        : (
        <FollowButton className="user-follower-button followed" data-id={follow.followerId || follow.followingId} 
        onClick={(e) => {
          const UnfollowClickedId = e.currentTarget.dataset.id
          handleUnFollowClicked(UnfollowClickedId)
        }}>正在跟隨</FollowButton>
        )}
    </StyledFollowerItemContainer>
  );
};

export default FollowerItem;