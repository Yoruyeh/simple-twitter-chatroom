import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FollowButton } from './common/button.styled';
import { getPopularFollowers } from '../api/popular.follower';
import { Follow, UnFollow } from '../api/user.follower';
import { useAuth } from '../context/AuthContext';

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
  width: 273px;
  height: 82px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
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
  flex-direction: column;
  justify-content: center;
  .popular-follower-name {
    line-height: 26px;
  }
  .popular-follower-account {
    color: var(--dark-70);
  }
`;

const PopularFollowerItem = () => {
  const [popularFollowers, setPopularFollowers] = useState([]);
  const { currentMember } = useAuth()

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
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
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
  }, []);

  return (
    <>
    {popularFollowers.map((popular) => {
      return (
      <StyledFollowerItem key={popular.id}>
        <StyledFollowerAvatar
          image={popular.avatar}/>
        <StyledFollowerInfo>
          <h6 className="popular-follower-name">{popular.name}</h6>
          <div className="popular-follower-account fontSecondary">
            @{popular.account}
          </div>
        </StyledFollowerInfo>
        {currentMember.id !== popular.id &&
        <FollowButton isfollowed={String(popular.isFollowed)} data-id={popular.id}
        onClick={(e) => {
          const clickedFollowId = e.currentTarget.dataset.id
          if(popular.isFollowed === true) {
            handleUnFollowClicked(clickedFollowId)
          } else {
            handleFollowClicked(clickedFollowId)
          }
        }}>
          {!popular.isFollowed ? '跟隨' : '正在跟隨'}
          </FollowButton>}
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
