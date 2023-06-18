import styled from 'styled-components'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TabTweetItems } from './TabTweetItems'
import { ReplyModal } from '../Modal'
import { useGetTweets } from '../../context/GetTweets'
import { useGetSelectedTweet } from '../../context/GetSelectedTweet'
import { useGetUserTweets } from '../../context/GetUserTweets'
import Alert from '../Alert'
import { useAuth } from '../../context/AuthContext'
import { getUserTweets } from '../../api/other.users'

const StyledContainer = styled.ul`
  li {
    margin-bottom: 16px;
  }
`
const StyledReplyModalContainer = styled.div`
  position: fixed;
  top: 56px;
  left: 50vw;
  transform: translateX(-50%);
  z-index: 1;

  &::before {
    content: '';
    position: fixed;
    top: -56px;
    left: -50vw;
    transform: translateX(300px);
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
`;

const StyledAlertContainer = styled.div`
  position: fixed;
  top: 56px;
  left: 35%;
  z-index: 1;
`

export default function TabTweets() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const { currentMemberInfo, setUserInfo } = useGetUserTweets()
  const { userTweets, setUserTweets } = useGetUserTweets()
  const { selectedReplyItem, isModalLoading, openReplyModal, handleOpenReplyModal } = useGetSelectedTweet();
  const { openAlert, alertType, currentMemberTweets } = useGetTweets()

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
    const getUserTweetsAsync = async () => {
      try {
        const tweets = await getUserTweets(JSON.parse(storedUserInfo).id);
        console.log(tweets)
        setUserTweets(tweets);
      } catch (error) {
        console.error(error);
      }
    };
      getUserTweetsAsync();
  },[setUserInfo, setUserTweets]);
 

  return (
    <StyledContainer>
    {userTweets && pathname.includes('others') ? (
      [...userTweets].map((tweet) => (
        <li key={tweet.id}>
          <TabTweetItems 
            tweet={tweet} 
          />
        </li>
      ))
    ) : (
      currentMemberTweets && [...currentMemberTweets].map((tweet) => (
        <li key={tweet.id}>
          <TabTweetItems 
            tweet={tweet}
          />
        </li>
      ))
    )}
      {openReplyModal && !isModalLoading && (
        <StyledReplyModalContainer>
          <ReplyModal
            placeholder={'推你的回覆'}
            handleOpenReplyModal={handleOpenReplyModal}
            selectedReplyItem={selectedReplyItem}
            currentMemberInfo={currentMemberInfo}
          />
        </StyledReplyModalContainer>
      )}
      {openAlert && (
        <StyledAlertContainer>
          <Alert alertType={alertType}/>
        </StyledAlertContainer>
      )}
    </StyledContainer>
  )
}
