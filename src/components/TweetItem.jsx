import styled from 'styled-components';
import { OutlinedLike, OutlinedReply, FilledLike } from '../assets/icons';
import { useGetSelectedTweet } from '../context/GetSelectedTweet';
import { useGetLikes } from '../context/GetLikes';
import { useGetUserTweets } from '../context/GetUserTweets';

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

const StyledTweetItemInReplyContainer = styled(StyledTweetItemContainer)`
  .reply-tweet-info {
    margin: 20px 30px 6px 82px;
  }

  .reply-tweet-info-username {
    font-weight: bold;
  }

  .reply-tweet-info-account,
  .reply-tweet-info-time {
    font-weight: regular;
    font-size: 14px;
    color: var(--secondary);
  }
  .reply-tweet-content {
    margin: 6px 30px 6px 82px;
    line-height: 26px;
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
  &:hover {
    cursor: pointer;
  }
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

    &:hover {
      cursor: pointer;
    }
  }

  .liked {
    > path {
      fill: var(--main);
    }
  }
`;

const TweetItemIcon = ({ tweet }) => {
  const { handleReplyIconClickedAtHome } = useGetSelectedTweet();
  const { userLikes, handleUnLikeAtHome, handleLikeAtHome } = useGetLikes();

  return (
    <StyledTweetIconContainer>
      <div className="tweet-reply-icon">
        <OutlinedReply
          data-id={tweet.id}
          onClick={(e) => {
            const clickedReplyIconId = e.currentTarget.dataset.id;
            handleReplyIconClickedAtHome(clickedReplyIconId);
          }}
        />
        <span className="tweet-reply-count">{tweet.replyCount}</span>
      </div>
      <div className="tweet-like-icon">
        {userLikes.some((like) => like.TweetId === tweet.id) ? (
          <FilledLike
            data-id={tweet.id}
            className="tweet-like-icon liked"
            onClick={(e) => {
              const clickedLikedIconId = e.currentTarget.dataset.id;
              handleUnLikeAtHome(clickedLikedIconId);
            }}
          />
        ) : (
          <OutlinedLike
            data-id={tweet.id}
            className="tweet-like-icon unliked"
            onClick={(e) => {
              const clickedLikedIconId = e.currentTarget.dataset.id;
              handleLikeAtHome(clickedLikedIconId);
            }}
          />
        )}
        <span className="tweet-like-count">{tweet.likeCount}</span>
      </div>
    </StyledTweetIconContainer>
  );
};

const TweetItem = ({ tweet }) => {
  const { handleTweetContentClick } = useGetSelectedTweet();
  const { handleAvatarClick } = useGetUserTweets();

  return (
    <StyledTweetItemContainer>
      <StyledAvatar
        image={tweet.User.avatar}
        data-id={tweet.userId}
        onClick={(e) => {
          const clickedAvatarId = e.currentTarget.dataset.id;
          handleAvatarClick(clickedAvatarId);
        }}
      />
      <div className="tweet-info">
        <span className="tweet-info-username">{tweet.User.name}</span>
        <span className="tweet-info-account"> @{tweet.User.account}・</span>
        <span className="tweet-info-time">{tweet.diffCreatedAt}</span>
      </div>
      <div
        className="tweet-content"
        data-id={tweet.id}
        onClick={(e) => {
          const clickedTweetId = e.currentTarget.dataset.id;
          handleTweetContentClick(clickedTweetId);
        }}
      >
        {tweet.description}
      </div>
    </StyledTweetItemContainer>
  );
};

const TweetItemInReply = ({ selectedReplyItem }) => {
  return (
    <StyledTweetItemInReplyContainer key={selectedReplyItem.id}>
      <StyledAvatar image={selectedReplyItem.User.avatar} />
      <div className="reply-tweet-info">
        <span className="reply-tweet-info-username">
          {selectedReplyItem.User.name}
        </span>
        <span className="reply-tweet-info-account">
          {' '}
          @{selectedReplyItem.User.account}・
        </span>
        <span className="reply-tweet-info-time">
          {selectedReplyItem.diffCreatedAt}
        </span>
      </div>
      <div className="reply-tweet-content" data-id={selectedReplyItem.id}>
        {selectedReplyItem.description}
      </div>
    </StyledTweetItemInReplyContainer>
  );
};

export { TweetItemIcon, TweetItem, TweetItemInReply };