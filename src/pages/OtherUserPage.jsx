import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useGetUserTweets } from '../context/GetUserTweets'
import MainLayout from '../layout/MainLayout'
import { OtherUserHeader } from '../components/Header'
import { OtherUserInfoCard } from '../components/common/UserInfoCard'
import Tab from '../components/common/Tab'


const StyledContainer = styled.div`
  .user-info {
    margin-bottom: 16px;
  }
`
export default function OtherUserPage() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const { userInfo } = useGetUserTweets()


 useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated, logout]);

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
