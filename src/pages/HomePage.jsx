import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import { MainHeader } from '../components/Header';
import { TweetInput } from '../components/TweetInput';
import TweetCollection from '../components/TweetCollection';
import { InputButton } from '../components/common/button.styled';
import { ReplyModal } from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { useGetTweets } from '../context/GetTweets'
import { useGetSelectedTweet } from '../context/GetSelectedTweet'


const StyledHomePageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .tweet-input-container {
    display: flex;
  }
  .tweet-input-area {
    width: 85%;
    height: 136px;
    border-bottom: 10px solid var(--gray1);
  }
  .tweet-button {
    width: 15%;
    height: 136px;
    border-bottom: 10px solid var(--gray1);
    position: relative;
    & button {
      position: absolute;
      bottom: 16px;
      right: 24px;
    }
  }
  .tweet-item-wrapper {
    border-bottom: 1px solid var(--gray1);
  }
`;

const StyledReplyModalContainer = styled.div`
  position: fixed;
  top: 56px;
  left: 28%;
  z-index: 1;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentMember } = useAuth();
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const { tweets, handleClickTweetInput } = useGetTweets()
  const { selectedReplyItem, isModalLoading } = useGetSelectedTweet()


  const handleOpenReplyModal = () => {
    setOpenReplyModal(!openReplyModal);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return (
    isAuthenticated &&
    <MainLayout>
      <StyledHomePageContainer>
        <div className="header">
          <MainHeader />
        </div>
        <div className="tweet-input-container">
          <div className="tweet-input-area">
            <TweetInput
              placeholder={'發生什麼新鮮事？'}
              currentMember={currentMember}
            />
          </div>
          <div className="tweet-button">
            <InputButton onClick={handleClickTweetInput}>推文</InputButton>
          </div>
        </div>
        <div className="tweet-collection">
          <TweetCollection
            tweets={tweets}
            handleOpenReplyModal={handleOpenReplyModal}
          />
        </div>
      </StyledHomePageContainer>
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
    </MainLayout>
  );
};

export default HomePage;