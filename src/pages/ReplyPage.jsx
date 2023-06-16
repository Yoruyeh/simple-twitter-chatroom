import styled from 'styled-components';
import { useState, useEffect } from 'react';
import MainLayout from '../layout/MainLayout'
import { ReplyHeader } from '../components/Header';
import TweetContent from '../components/TweetContent'
import ReplyCollection from '../components/ReplyCollection'
import { ReplyModal } from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { useGetSelectedTweet } from '../context/GetSelectedTweet';
import { useNavigate } from 'react-router-dom';
import { useGetTweets } from '../context/GetTweets';
import Alert from '../components/Alert';


const StyledReplyPageContainer = styled.div`
  width: 100%;
  height: 100%;
  .tweet-content-container {
    border-bottom: 1px solid var(--gray1);
  }
  .reply-item-wrapper {
    border-bottom: 1px solid var(--gray1);
  }
`

const StyledReplyModalContainer = styled.div`
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
`;

const StyledAlertContainer = styled.div`
  position: fixed;
  top: 56px;
  left: 35%;
  z-index: 1;
`

const ReplyPage = () => {
  const { currentMember, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const { isReplyPageLoading, selectedReplyItem, isModalLoading, replies } = useGetSelectedTweet();
  const { openAlert, alertType } = useGetTweets()

  const handleOpenReplyModal = () => {
    setOpenReplyModal(!openReplyModal);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);


  return (
  !isReplyPageLoading &&
  (
    <MainLayout>
      <StyledReplyPageContainer>
        <div className="header">
          <ReplyHeader />
        </div>
        <div className="tweet-content-container">
            <TweetContent selectedReplyItem={selectedReplyItem} handleOpenReplyModal={handleOpenReplyModal}/>
        </div>
        <div className="reply-collection">
          <ReplyCollection replies={replies}/>
        </div>
      </StyledReplyPageContainer>
      {openReplyModal && !isModalLoading && (
        <StyledReplyModalContainer>
          <ReplyModal
            placeholder={'推你的回覆'}
            handleOpenReplyModal={handleOpenReplyModal}
            selectedReplyItem={selectedReplyItem}
            currentMember={currentMember}
          />
        </StyledReplyModalContainer>
      )}
      {openAlert && (
        <StyledAlertContainer>
          <Alert alertType={alertType}/>
        </StyledAlertContainer>
      )}
    </MainLayout>
  )
)
}

export default ReplyPage