import styled from 'styled-components';
import { OutlinedLike, OutlinedReply } from '../assets/icons';


const StyledTweetItemContainer = styled.div`
  font-family: 'Noto Sans TC', sans-serif;
  width: 100%;
  height: 100%;
  color: var(--dark-100);
  font-size: 16px;
  display: flex;
  flex-direction: column;
  position: relative;

  .tweet-info {
    margin: 20px 30px 6px 82px;
  }

  .tweet-info-username {
    font-weight: bold;
  }

  .tweet-info-account, .tweet-info-time {
    font-weight: regular;
    font-size: 14px;
    color: var(--secondary);
  }

  .tweet-content {
    margin: 6px 30px 6px 82px;
    line-height: 26px;
  }
`;

const StyledAvatar = styled.div`
  background-image: url(${(props) => props.image ? props.image : ""});
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 16px;
  left: 24px;
`

const StyledTweetIconContainer = styled.div`
    margin: 6px 30px 6px 82px;
    font-size: 14px;
    font-weight: semi-bold;
    color: var(--secondary);

  .tweet-reply-icon, .tweet-like-icon {
    display: inline-flex;
    align-items: center;
    margin-right: 40px;
  }

  svg {
      width: 14px;
      height: 14px;
      margin-right: 9px;
    }
`

const TweetItemIcon = () => {
  return (
    <StyledTweetIconContainer>
        <div className="tweet-reply-icon">
        <OutlinedReply />
        <span className="tweet-reply-count"> 36</span>
        </div>
        <div className="tweet-like-icon">
        <OutlinedLike />
        <span className="tweet-like-count">25</span>
        </div>
      </StyledTweetIconContainer>
  )
}

const TweetItem = () => {
  return (
    <StyledTweetItemContainer>
        <StyledAvatar image={"https://images.unsplash.com/photo-1685491107139-7d7f4f17b3eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80"}/>
      <div className="tweet-info">
        <span className="tweet-info-username"> Apple</span>
        <span className="tweet-info-account"> @apple・</span>
        <span className="tweet-info-time"> 3小時</span>
      </div>
      <div className="tweet-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </StyledTweetItemContainer>
  );
};

export {TweetItemIcon, TweetItem};