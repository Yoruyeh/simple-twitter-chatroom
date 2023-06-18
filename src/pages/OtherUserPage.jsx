import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useGetUserTweets } from '../context/GetUserTweets'
import MainLayout from '../layout/MainLayout'
import { OtherUserHeader } from '../components/Header'
import { OtherUserInfoCard } from '../components/common/UserInfoCard'
import Tab from '../components/common/Tab'
import { getUserInfo } from '../api/other.users'

const StyledContainer = styled.div`
  .user-info {
    margin-bottom: 16px;
  }
`
export default function OtherUserPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useGetUserTweets()


  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    const getUserInfoAsync = async () => {
      try {
        const info = await getUserInfo(userInfo.id);
        setUserInfo(info);
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfoAsync()
  }, [navigate, isAuthenticated, userInfo, setUserInfo]);

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
