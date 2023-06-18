import styled from 'styled-components'
import { useEffect } from 'react'
import { useGetUserTweets } from '../context/GetUserTweets'
import MainLayout from '../layout/MainLayout'
import { OtherUserHeader } from '../components/Header'
import { OtherUserInfoCard } from '../components/common/UserInfoCard'
import Tab from '../components/common/Tab'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const StyledContainer = styled.div`
  .user-info {
    margin-bottom: 16px;
  }
`
export default function OtherUserPage() {
  const { userInfo, setUserInfo } = useGetUserTweets()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  })

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
    setUserInfo(JSON.parse(storedUserInfo));
  }
  }, []);

  return (
    <MainLayout>
      <StyledContainer className='container-fuild'>
        <div className='header'>
          <OtherUserHeader userInfo={userInfo}/>
        </div>
        <div className='user-info'>
          <OtherUserInfoCard userInfo={userInfo}/>
        </div>
        <div className='user-tab'>
          <Tab></Tab>
        </div>
      </StyledContainer>
    </MainLayout>
  )
}
