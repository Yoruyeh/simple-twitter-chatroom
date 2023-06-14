import styled from 'styled-components';
import { OutlinedLike, OutlinedReply, FilledLike } from '../assets/icons';
import { useGetTheTweet } from '../context/GetTweetAndReplies'
import { useCreateTweet } from '../context/CreateTweet';
// import { useCreateTweet } from '../context/CreateTweet'

const StyledTweetContent = styled.div`
  font-family: 'Noto Sans TC', sans-serif;
  width: 100%;
  height: 100%;
  padding: 0 16px;
  color: var(--dark-100);
  font-size: 24px;
  line-height: 36px;
  display: flex;
  flex-direction: column;
  position: relative;

  .tweet-content-info {
    width: 100%;
    height: 74px;
    display: flex;
    flex-direction: column;
    padding: 20px 0 0 66px;
  }
  .tweet-content-username {
    font-weight: bold;
    font-size: 16px;
    line-height: 26px;
  }

  .tweet-content-account {
    font-weight: regular;
    font-size: 14px;
    color: var(--secondary);
    line-height: 22px;
  }
  .tweet-content-content {
    width: 100%;
    height: 108px;
    overflow-wrap: break-word;
  }
  .tweet-content-time {
    width: 100%;
    height: 38px;
    font-size: 14px;
    color: var(--secondary);
    border-bottom: 1px solid var(--gray1);
  }
  .tweet-content-count {
    width: 100%;
    height: 100%;
    font-size: 19px;
    color: var(--secondary);
    border-bottom: 1px solid var(--gray1);
    display: flex;
    align-items: center;
    & span {
      font-weight: bold;
      color: var(--dark-100);
    }
  }
  .tweet-content-count-like {
    margin-left: 24px;
  }
  .tweet-content-icon {
    width: 100%;
    height: 68px;
    position: relative;
  }
  .tweet-content-icon-reply {
    position: absolute;
    top: 21px;
    left: 0;
     &:hover {
      cursor: pointer;
    }
  }
  .tweet-content-icon-like {
    position: absolute;
    top: 21px;
    left: 133px;
     &:hover {
      cursor: pointer;
    }
  }
  .liked  {
    > path {
      fill: var(--main);
    }
  }
`
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

const TweetContent = ({ selectedItem, handleOpenReplyModal }) => {
  const { handleReplyIconClicked } = useGetTheTweet()
  return (
  <StyledTweetContent key={selectedItem.id}>
    <StyledAvatar image={selectedItem.User.avatar}/>
    <div className="tweet-content-info">
      <span className="tweet-content-username">{selectedItem.User.name}</span>
      <span className="tweet-content-account"> @{selectedItem.User.account}</span>
    </div>
    <div className="tweet-content-content">
      {selectedItem.description}
      </div>
    <div className="tweet-content-time">{selectedItem.createdAt}</div>
    <div className="tweet-content-count">
      <div className="tweet-content-count-reply"><span>{selectedItem.replyCount}</span> 回覆</div>
      <div className="tweet-content-count-like"><span>{selectedItem.likeCount}</span> 喜歡次數</div>
    </div>
    <div className="tweet-content-icon">
      <OutlinedReply className="tweet-content-icon-reply" 
      onClick={() => {
      handleReplyIconClicked(selectedItem.id)
      handleOpenReplyModal()
      }}/>
      <OutlinedLike className="tweet-content-icon-like"/>
    </div>
  </StyledTweetContent>
  )
}

export default TweetContent