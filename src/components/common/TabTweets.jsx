import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { checkPermission } from '../../api/checkPermission'
import { getUserTweet } from '../../api/users'
import { TabTweetItems } from './TabTweetItems'
import { ReplyModal } from '../Modal'
import { useAuth } from '../../context/AuthContext'
import { useGetTweets } from '../../context/GetTweets'
import { useGetSelectedTweet } from '../../context/GetSelectedTweet'
import { useGetUserTweets } from '../../context/GetUserTweets'
import Alert from '../Alert'

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
  const [tweets, setTweets] = useState([])
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const { currentMember } = useAuth()
  const { userTweets } = useGetUserTweets()
  const { selectedReplyItem, isModalLoading, openReplyModal, handleOpenReplyModal } = useGetSelectedTweet();
  const { openAlert, alertType } = useGetTweets()

  useEffect(() => {
    let userId = ''
    // 檢查 token 是否有效、並取得使用者資料
    async function checkTokenIsValid() {
      // 在本地瀏覽器取得 token
      const token = localStorage.getItem('token')
      // token 不存在，跳轉到 login
      if (!token) {
        navigate('/login')
        return
      }
      // 驗證 token 是否有效
      // 無效，跳轉到 login
      const result = await checkPermission(token)
      if (!result) {
        navigate('/login')
        return
      }
      // token有效、取得 id
      userId = result.id
      // 取得推文函數
      async function getTweetByidAsync(token, userId) {
        const GetUserTweets = await getUserTweet(token, userId)
        setTweets(GetUserTweets)
      }
      // 根據 id 取得使用者推文
      await getTweetByidAsync(token, userId)
    }
    checkTokenIsValid()
  }, [navigate])

  return (
    <StyledContainer>
    {userTweets && pathname.includes('others') ? (
      [...userTweets].reverse().map((tweet) => (
        <li key={tweet.id}>
          <TabTweetItems 
            tweet={tweet} 
          />
        </li>
      ))
    ) : (
      tweets && [...tweets].reverse().map((tweet) => (
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
            currentMember={currentMember}
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
