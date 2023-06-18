import styled from 'styled-components'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TabRepliesItems } from './TabRepliesItems'
import { useGetUserTweets } from '../../context/GetUserTweets'
import { useAuth } from '../../context/AuthContext'
import { useGetSelectedTweet } from '../../context/GetSelectedTweet'
import { getUserReplies } from '../../api/other.users'

const StyledContainer = styled.ul`
  li {
    margin-bottom: 16px;
  }
`

export default function TabRepliesTweets() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const pathname = useLocation().pathname
  const { userReplies, setUserInfo, setUserReplies } = useGetUserTweets()
  const { currentMemberReplies }= useGetSelectedTweet()

    useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

   useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (!storedUserInfo) {
      return
    }
    setUserInfo(JSON.parse(storedUserInfo));
    const getUserRepliesAsync = async () => {
      try {
        const replies = await getUserReplies(JSON.parse(storedUserInfo).id);
        setUserReplies(replies);
      } catch (error) {
        console.error(error);
      }
    };
      getUserRepliesAsync();
  },[setUserInfo, setUserReplies]);
 

  return (
    <StyledContainer>
    {userReplies && pathname.includes('others') ? 
      userReplies.map((tweet) => (
        <li key={tweet.id}>
          <TabRepliesItems tweet={tweet} replyid/>
        </li>
      ))
    : 
     currentMemberReplies && currentMemberReplies.map((tweet) => (
        <li key={tweet.id}>
          <TabRepliesItems tweet={tweet} replyid/>
        </li>
      ))
    }
    </StyledContainer>
  )
}


