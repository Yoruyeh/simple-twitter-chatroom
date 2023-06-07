import styled from 'styled-components';
import { OutlinedLike, OutlinedReply } from '../assets/icons';


const StyledTweetItem = styled.div`
  font-family: 'Noto Sans TC', sans-serif;
  border-bottom: 1px solid #e6ecf0;
  width: 640px;
  height: 168px;
  color: #171725;
  font-size: 16px;

  .tweet-container {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .tweet-info {
    margin: 20px 30px 6px 82px;
  }

  .tweet-info-username {
    font-weight: bold;
  }

  .tweet-info-account, .tweet-info-time {
    font-weight: regular;
    font-size: 14px;
    color: #6c757d;
  }

  .tweet-content {
    margin: 6px 30px 6px 82px;
    line-height: 26px;
  }

  .tweet-icon {
    margin: 6px 30px 6px 82px;
    font-size: 14px;
    font-weight: semi-bold;
    color: #6c757d;
  }

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

const TweetItem = () => {
  return (
    <StyledTweetItem>
      <div className="tweet-container">
        <StyledAvatar image={"https://images.unsplash.com/photo-1685491107139-7d7f4f17b3eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80"}/>
      <div className="tweet-info">
        <span className="tweet-info-username"> Apple</span>
        <span className="tweet-info-account"> @apple・</span>
        <span className="tweet-info-time"> 3小時</span>
      </div>
      <div className="tweet-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <div className="tweet-icon">
        <div className="tweet-reply-icon">
        <OutlinedReply />
        <span className="tweet-reply-count"> 36</span>
        </div>
        <div className="tweet-like-icon">
        <OutlinedLike />
        <span className="tweet-like-count">25</span>
        </div>
      </div>
      </div>
    </StyledTweetItem>
  );
};

export default TweetItem;