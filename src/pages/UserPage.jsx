import styled from 'styled-components'
import { UserInfoCard } from '../components/common/UserInfoCard'
import Tab from '../components/common/Tab'
import MainLayout from '../layout/MainLayout'
import { UserHeader } from '../components/Header'

const StyledContainer = styled.div`
  .user-info {
    margin-bottom: 16px;
  }
`
export default function UserPage() {
  return (
    <MainLayout>
      <StyledContainer className='container-fuild'>
        <div className='header'>
          <UserHeader />
        </div>
        <div className='user-info'>
          <UserInfoCard />
        </div>
        <div className='user-tab'>
          <Tab></Tab>
        </div>
      </StyledContainer>
    </MainLayout>
  )
}
