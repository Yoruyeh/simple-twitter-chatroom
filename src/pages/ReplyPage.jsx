// import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout'
import { ReplyHeader } from '../components/Header';
import TweetContent from '../components/TweetContent'
import ReplyCollection from '../components/ReplyCollection'
import { useGetTheTweet } from '../context/GetTheTweet';

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
const ReplyPage = () => {
  const { selectedItem, isLoading } = useGetTheTweet()
  return (
  !isLoading && 
  (
    <MainLayout>
      <StyledReplyPageContainer>
        <div className="header">
          <ReplyHeader />
        </div>
        <div className="tweet-content-container">
          <TweetContent selectedItem={selectedItem} />
        </div>
        <div className="reply-collection">
          <ReplyCollection />
        </div>
      </StyledReplyPageContainer>
    </MainLayout>
  )
)
}

export default ReplyPage