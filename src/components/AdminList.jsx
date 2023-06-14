import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { adminGetTweets } from '../api/admin'
import AdminTweetsItems from './common/AdminTweetsItems'

const StyledContainer = styled.div``
const StyledHeader = styled.header`
  height: 75px;
  padding: 24px 21.79px;
  border-bottom: 1px solid #e6ecf0;
`
const StyledMain = styled.main``

export default function AdminList() {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    async function AsyncadminGetTweets(token) {
      const data = await adminGetTweets(token)
      setTweets(data)
    }

    if (token) {
      AsyncadminGetTweets(token)
    }
  }, []) // 空依賴數組確保只在組件掛載時執行

  return (
    <StyledContainer>
      <StyledHeader>
        <h4 className='title'>推文清單</h4>
      </StyledHeader>
      <StyledMain>
        <ul>
          {tweets.map((tweet) => {
            return (
              <li key={tweet.id}>
                <AdminTweetsItems tweet={tweet} />
              </li>
            )
          })}
        </ul>
      </StyledMain>
    </StyledContainer>
  )
}
