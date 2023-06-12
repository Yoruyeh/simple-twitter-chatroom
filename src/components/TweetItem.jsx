import styled from 'styled-components';
import { useGetTheTweet } from '../context/GetTheTweet'
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

  .tweet-info-account,
  .tweet-info-time {
    font-weight: regular;
    font-size: 14px;
    color: var(--secondary);
  }

  .tweet-content {
    margin: 6px 30px 6px 82px;
    line-height: 26px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const StyledAvatar = styled.div`
  background-image: url(${(props) => (props.image ? props.image : '')});
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 16px;
  left: 24px;
`;

const StyledTweetIconContainer = styled.div`
  margin: 6px 30px 6px 82px;
  font-size: 14px;
  font-weight: semi-bold;
  color: var(--secondary);

  .tweet-reply-icon,
  .tweet-like-icon {
    display: inline-flex;
    align-items: center;
    margin-right: 40px;
  }

  svg {
    width: 14px;
    height: 14px;
    margin-right: 9px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const TweetItemIcon = ({ tweet }) => {
  const { handleReplyIconClicked } = useGetTheTweet()
  
  return (
    <StyledTweetIconContainer data-id={tweet.id}>
      <div className="tweet-reply-icon" data-id={tweet.id} 
      onClick={(e) => {
        const clickedReplyIconId = e.target.dataset.id
        handleReplyIconClicked(clickedReplyIconId)
      }}>
        <OutlinedReply data-id={tweet.id} />
        <span className="tweet-reply-count" data-id={tweet.id}>{tweet.replyCount}</span>
      </div>
      <div className="tweet-like-icon" data-id={tweet.id}>
        <OutlinedLike data-id={tweet.id}/>
        <span className="tweet-like-count" data-id={tweet.id}>{tweet.likeCount}</span>
      </div>
    </StyledTweetIconContainer>
  );
};

const TweetItem = ({ tweet }) => {
  const { handleTweetContentClick } = useGetTheTweet()

  return (
    <StyledTweetItemContainer>
      <StyledAvatar image={tweet.User.avatar} />
      <div className="tweet-info">
        <span className="tweet-info-username">{tweet.User.name}</span>
        <span className="tweet-info-account"> @{tweet.User.account}・</span>
        <span className="tweet-info-time">
          {tweet.diffCreatedAt}
        </span>
      </div>
      <div className="tweet-content" data-id={tweet.id} 
      onClick={(e) => {
        const clickedTweetId = e.target.dataset.id
        handleTweetContentClick(clickedTweetId)
      }}>
        {tweet.description}
        </div>
    </StyledTweetItemContainer>
  );
};

export { TweetItemIcon, TweetItem };