import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminGetTweets, adminDeleteTweet } from '../api/admin'
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
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    async function AsyncadminGetTweets(token) {
      const { status, data } = await adminGetTweets(token)
      if (status === 200) {
        // 將推文按照時間排序 (新 => 舊)
        let sortedTweets = data.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime()
          const dateB = new Date(b.createdAt).getTime()
          return dateB - dateA
        })
        setTweets(sortedTweets)
      } else if (status === 401) {
        navigate('/admin/login')
      }
    }

    if (token) {
      AsyncadminGetTweets(token)
    }
  }, [navigate])

  async function handleClick(event) {
    const tweetID = event.target.getAttribute('data-id')
    const token = localStorage.getItem('adminToken')
    if (tweetID) {
      const status = await adminDeleteTweet(token, tweetID)

      if (status === 200) {
        setTweets(tweets.filter((tweet) => tweet.id.toString() !== tweetID))
        console.log('刪除成功')
      } else if (status === 401) {
        navigate('/admin/login')
      }
    }
  }

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
                <AdminTweetsItems
                  tweet={tweet}
                  handleClick={(event) => {
                    handleClick(event)
                  }}
                />
              </li>
            )
          })}
        </ul>
      </StyledMain>
    </StyledContainer>
  )
}
