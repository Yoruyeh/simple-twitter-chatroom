import styled from 'styled-components'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TabRepliesItems } from './TabRepliesItems'
import { useGetUserTweets } from '../../context/GetUserTweets'
import { useAuth } from '../../context/AuthContext'
import { useGetSelectedTweet } from '../../context/GetSelectedTweet'

const StyledContainer = styled.ul`
  li {
    margin-bottom: 16px;
  }
`

export default function TabRepliesTweets() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const pathname = useLocation().pathname
  const { userReplies } = useGetUserTweets()
  const { currentMemberReplies }= useGetSelectedTweet()

    useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

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


