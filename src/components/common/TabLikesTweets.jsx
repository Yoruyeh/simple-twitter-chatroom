import styled from 'styled-components'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TabLikesTweetsItems } from './TabLikesTweetsItems'
import { useGetUserTweets } from '../../context/GetUserTweets'
import { useAuth } from '../../context/AuthContext'
import { useGetLikes } from '../../context/GetLikes'
import { getLikes } from '../../api/like'

const StyledContainer = styled.ul`
  li {
    margin-bottom: 16px;
  }
`

export default function TabLikesTweets() {
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()
  const pathname = useLocation().pathname
  const { userLikes, setUserInfo, setUserLikes } = useGetUserTweets()
  const { currentMemberLikes } = useGetLikes()

   useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

    useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
    setUserInfo(JSON.parse(storedUserInfo));
    }

    const getUserRepliesAsync = async () => {
      try {
        const likes = await getLikes(JSON.parse(storedUserInfo).id);
        setUserLikes(likes);
      } catch (error) {
        console.error(error);
      }
    };
      getUserRepliesAsync();
  },[setUserInfo, setUserLikes]);

  return (
    <StyledContainer>
     {userLikes && pathname.includes('others') ? 
      userLikes.map((tweet) => (
        <li key={tweet.Tweet.id}>
            <TabLikesTweetsItems tweet={tweet}></TabLikesTweetsItems>
          </li>
      ))
    : 
      currentMemberLikes && currentMemberLikes.map((tweet) => (
        <li key={tweet.Tweet.id}>
            <TabLikesTweetsItems tweet={tweet}></TabLikesTweetsItems>
          </li>
      ))
    }
    </StyledContainer>
  )
}

