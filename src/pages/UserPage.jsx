import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { UserInfoCard } from '../components/common/UserInfoCard'
import Tab from '../components/common/Tab'
import MainLayout from '../layout/MainLayout'
import { UserHeader } from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { useGetUserTweets } from '../context/GetUserTweets'

const StyledContainer = styled.div`
  .user-info {
    margin-bottom: 16px;
  }
`
export default function UserPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { currentMemberInfo } = useGetUserTweets()


  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  
  return (
    <MainLayout>
      <StyledContainer className='container-fuild'>
        <div className='header'>
          <UserHeader />
        </div>
        <div className='user-info'>
          <UserInfoCard currentMemberInfo={currentMemberInfo}/>
        </div>
        <div className='user-tab'>
          <Tab></Tab>
        </div>
      </StyledContainer>
    </MainLayout>
  )
}
