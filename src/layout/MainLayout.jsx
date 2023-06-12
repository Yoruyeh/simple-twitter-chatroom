import { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import {
  PopularFollower,
  PopularFollowerItem,
} from '../components/PopularFollower'
import { TweetModal } from '../components/Modal'
import { useAuth } from '../context/AuthContext'

const StyledMainLayoutContainer = styled.div`
  .row {
    margin: 0 130px;
    height: 100vh;
  }
  .navbar-container {
    padding: 0;
    position: relative;
    border-right: 1px solid var(--gray1);
  }
  .main-container {
    padding: 0;
    overflow-y: scroll;
    height: 100vh;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: -1px 0px 0px 0px rgba(240, 240, 240, 1) inset,
        1px 0px 0px 0px rgba(232, 232, 232, 1) inset;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #c1c1c1;
      border: 1px solid (--gray1);
      border-radius: 8px;
    }
  }
  .popular-follower-container {
    border-left: 1px solid var(--gray1);
  }
  .header {
    border-bottom: 1px solid var(--gray1);
    height: 75px;
  }
  @media screen and (min-width: 992px) and (max-width: 1199px) {
    max-width: 960px;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1140px;
  }
`

const StyledTweetModalContainer = styled.div`
  position: fixed;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: -56px;
    left: -50%;
    transform: translateX(-120px);
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
`

const MainLayout = ({ children }) => {
  const [openTweetModal, setOpenTweetModal] = useState(false)
    const { currentMember } = useAuth()

  const handleOpenTweetModal = () => {
    setOpenTweetModal(!openTweetModal)
  }
  return (
      <StyledMainLayoutContainer className='container-fluid px-0'>
        <div className='row mx-0'>
          <div className='col-2 navbar-container'>
            <Navbar handleOpenTweetModal={handleOpenTweetModal} />
          </div>
          <div className='col-7 main-container'>{children}</div>
          <div className='col-3 popular-follower-container'>
            <PopularFollower>
              <PopularFollowerItem />
            </PopularFollower>
          </div>
        </div>
        {openTweetModal && (
          <StyledTweetModalContainer>
            <TweetModal
              placeholder={'有什麼新鮮事？'}
              handleOpenTweetModal={handleOpenTweetModal}
              currentMember={currentMember}
            />
          </StyledTweetModalContainer>
        )}
      </StyledMainLayoutContainer>
  )
}

export default MainLayout
