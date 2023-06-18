import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FollowButton } from './common/button.styled';
import { getPopularFollowers } from '../api/popular.follower';
import { Follow, UnFollow, getUserFollowingsById } from '../api/user.follower';
import { useAuth } from '../context/AuthContext';
import { useGetUserTweets } from '../context/GetUserTweets';
import { getUserInfo } from '../api/other.users';

const StyledFollowerContainer = styled.div`
  width: 273px;
  height: 731px;
  background-color: var(--dark-20);
  border-radius: 16px;
  font-family: 'Noto Sans TC';
  margin-top: 16px;
  position: static;

  .popular-follower-title {
    width: 100%;
    height: 74px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--gray1);
    & h4 {
      margin-left: 24px;
    }
  }
`;

const StyledFollowerItem = styled.div`
  width: 100%;
  height: 82px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  .popular-button-wrapper {
    width: 50%;
    height: 100%
    display: flex;
    text-align: center;
  }
`;
const StyledFollowerAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(${({ image }) => image});
  background-size: cover;
`;
const StyledFollowerInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  height: 100%;
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  .popular-follower-name {
    line-height: 26px;
  }

  .popular-follower-account {
    color: var(--dark-70);
    font-weight: 500;
  }
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 50px;
  }

`;

const PopularFollowerItem = () => {
  const [popularFollowers, setPopularFollowers] = useState([]);
  const { currentMember, isAuthenticated } = useAuth()
  const { setCurrentMemberFollowings, setCurrentMemberInfo } = useGetUserTweets()

  const handleFollowClicked = async (id) => {
    if (currentMember.id === id) {
      return
    }
    try {
      await Follow({ 
        id: id 
      })
      const popularObject = await getPopularFollowers();
      const populars = popularObject.users
      setPopularFollowers(populars)
      const followings = await getUserFollowingsById(currentMember.id)
      setCurrentMemberFollowings(followings)
      const newInfo = await getUserInfo(currentMember.id)
      setCurrentMemberInfo(newInfo)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUnFollowClicked = async (id) => {
    try {
      await UnFollow(id)
      const popularObject = await getPopularFollowers();
      const populars = popularObject.users
      setPopularFollowers(populars)
      const followings = await getUserFollowingsById(currentMember.id)
      setCurrentMemberFollowings(followings)
      const newInfo = await getUserInfo(currentMember.id)
      setCurrentMemberInfo(newInfo)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      const getPopularFollowersAsync = async () => {
      try {
        const popularObject = await getPopularFollowers();
        const populars = popularObject.users
        setPopularFollowers(populars);
      } catch (error) {
        console.error(error);
      }
    };
    getPopularFollowersAsync();
    }
  }, [isAuthenticated]);

  return (
    <>
    {popularFollowers.map((popular) => {
      return (
      <StyledFollowerItem key={popular.id}>
        <StyledFollowerInfo>
          <StyledFollowerAvatar image={popular.avatar}/>
          <div className="popular-info-wrapper">
            <h6 className="popular-follower-name ellipsis">{popular.name}</h6>
            <div className="popular-follower-account fontSecondary ellipsis">
              @{popular.account}</div>
          </div>
        </StyledFollowerInfo>
        <div className="popular-button-wrapper">
        {currentMember.id !== popular.id && !popular.isFollowed ? (
          <FollowButton className="unfollowed" data-id={popular.id}
        onClick={(e) => {
          const clickedFollowId = e.currentTarget.dataset.id
          if(popular.isFollowed) {
            handleUnFollowClicked(clickedFollowId)
          } else {
            handleFollowClicked(clickedFollowId)
          }
        }}>跟隨</FollowButton>
        ) : (
          <FollowButton className="followed" data-id={popular.id}
        onClick={(e) => {
          const clickedFollowId = e.currentTarget.dataset.id
          if(popular.isFollowed === true) {
            handleUnFollowClicked(clickedFollowId)
          } else {
            handleFollowClicked(clickedFollowId)
          }
        }}>正在跟隨</FollowButton>
        )
        }
        </div>
      </StyledFollowerItem>
      )
    })}
    </>
  );
};

const PopularFollower = ({ children }) => {
  return (
    <StyledFollowerContainer>
      <div className="popular-follower-title">
        <h4>推薦跟隨</h4>
      </div>
      {children}
    </StyledFollowerContainer>
  );
};

export { PopularFollower, PopularFollowerItem };
