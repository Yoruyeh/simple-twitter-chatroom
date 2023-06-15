import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { checkPermission } from '../../api/checkPermission'
import { getUserReplied } from '../../api/users'
import { TabRepliesItems } from './TabRepliesItems'
import { useGetUserTweets } from '../../context/GetUserTweets'

const StyledContainer = styled.ul`
  li {
    margin-bottom: 16px;
  }
`

export default function TabRepliesTweets() {
  const [tweets, setTweets] = useState([])
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const { userReplies } = useGetUserTweets()

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
        const GetUserTweets = await getUserReplied(token, userId)
        setTweets(GetUserTweets)
      }
      // 根據 id 取得使用者推文
      await getTweetByidAsync(token, userId)
    }
    checkTokenIsValid()
  }, [navigate])

  return (
    <StyledContainer>
    {pathname.includes('others') ? 
      userReplies.map((tweet) => (
        <li key={tweet.id}>
          <TabRepliesItems tweet={tweet} replyid/>
        </li>
      ))
    : 
      tweets.map((tweet) => (
        <li key={tweet.id}>
          <TabRepliesItems tweet={tweet} replyid/>
        </li>
      ))
    }
    </StyledContainer>
  )
}


