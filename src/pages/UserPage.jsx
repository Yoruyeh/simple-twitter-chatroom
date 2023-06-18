import styled from 'styled-components'
import { useState } from 'react'
import { UserInfoCard } from '../components/common/UserInfoCard'
import Tab from '../components/common/Tab'
import MainLayout from '../layout/MainLayout'
import { UserHeader } from '../components/Header'
import { useGetUserTweets } from '../context/GetUserTweets'
import { EditModal } from '../components/Modal'


const StyledContainer = styled.div`
  .user-info {
    margin-bottom: 16px;
  }
`
const StyledEditModalContainer = styled.div`
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

export default function UserPage() {
  const { currentMemberInfo } = useGetUserTweets()
  const [openEditModal, setOpenEditModal] = useState(false)
  const handleOpenEditModal = () => {
    setOpenEditModal(!openEditModal)
  }

  
  return (
    <MainLayout>
      <StyledContainer className='container-fuild'>
        <div className='header'>
          <UserHeader />
        </div>
        <div className='user-info'>
          <UserInfoCard currentMemberInfo={currentMemberInfo} handleOpenEditModal={handleOpenEditModal}/>
        </div>
        <div className='user-tab'>
          <Tab></Tab>
        </div>
      </StyledContainer>
      {openEditModal && 
      <StyledEditModalContainer>
            <EditModal handleOpenEditModal={handleOpenEditModal}/>
      </StyledEditModalContainer>
      } 
    </MainLayout>
  )
}
