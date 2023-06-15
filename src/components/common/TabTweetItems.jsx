import { styled } from 'styled-components'
import { OutlinedReply, OutlinedLike, FilledLike } from '../../assets/icons'
import { PillButton } from './button.styled'
import { Link, useLocation } from 'react-router-dom'
import { useGetSelectedTweet } from '../../context/GetSelectedTweet'
import { useGetLikes } from '../../context/GetLikes'
import { useGetUserTweets } from '../../context/GetUserTweets'

const TweetContainer = styled(Link)`
  color: var(--dark-100);
  text-decoration: none;
  border-bottom: 1px solid var(--gray1);
  width: 100%;

  .user-img-wrapper {
    padding: 0 8px 0 24px;
    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  .tweet-wrapper {
    position: relative;
    padding: 0 24px 17px 0;
    width: 100%;

    .tweet-header {
      gap: 8px;
      margin-bottom: 8px;
      line-height: 26px;

      .tweet-account {
        font-size: 14px;
        color: var(--secondary);
        transform: translateY(1px);
      }

      button {
        position: absolute;
        right: 0;
      }
    }

    .replyid-wrapper {
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 8px;
      p {
        color: var(--secondary);

        span {
          color: var(--main);
        }
      }
    }

    .tweet-main {
      margin-bottom: 8px;
      .tweet-text {
        line-height: 26px;
        font-size: 16px;
        font-weight: 400;
      }
    }

    .tweet-footer {
      .icon-wrapper {
        gap: 40px;
      }
      .item {
        color: var(--secondary);
        font-weight: 600;
        gap: 8px;
        svg {
          width: 16px;
          height: 16px;
        }
        .item-text {
          transform: translateY(-1px);
        }
      }
    }
    .liked  {
    > path {
      fill: var(--main);
    }
  }
  }
`

function returnReplyId(replyid) {
  if (replyid) {
    return (
      <div className='replyid-wrapper'>
        <p>
          回覆 <span>{`@${replyid}`}</span>
        </p>
      </div>
    )
  } else {
    return
  }
}

function returnButton(button) {
  if (button) {
    return <PillButton>跟隨</PillButton>
  } else {
    return
  }
}

export function TabTweetItems({ tweet, replyid, button, handleOpenReplyModal }) {
  const { handleReplyIconClickedAtUser } = useGetSelectedTweet()
  const { handleReplyIconClickedAtOther } = useGetUserTweets()
  const { userLikes, handleUnLikeAtUser, handleLikeAtUser } = useGetLikes()
  const pathname = useLocation().pathname


  return (
    <TweetContainer className='d-flex px-0'>
      <div className='user-img-wrapper'>
        <img src={tweet.User.avatar} alt='avatar' className='user-avatar'></img>
      </div>

      <div className='tweet-wrapper'>
        <div className='tweet-header d-flex'>
          <h6 className='tweet-name'>{tweet.User.name}</h6>
          <span className='tweet-account'>
            @{`${tweet.User.account}・${tweet.diffCreatedAt}`}
          </span>
          {returnButton(button)}
        </div>

        {returnReplyId(replyid)}

        <div className='tweet-main'>
          <p className='tweet-text'>{tweet.description}</p>
        </div>
        <div className='tweet-footer'>
          <div className='icon-wrapper d-flex align-items-center'>
            <div className='item d-flex'>
        <OutlinedReply data-id={tweet.id} 
        onClick={(e) => {
        const clickedReplyIconId = e.currentTarget.dataset.id
        if (pathname.includes('others')) {
          handleReplyIconClickedAtOther(clickedReplyIconId)
        } else {
          handleReplyIconClickedAtUser(clickedReplyIconId)
        }
          handleOpenReplyModal()
      }} />
              <span className='item-text'>{tweet.replyCount}</span>
            </div>
            <div className='item d-flex'>
       {userLikes.some(like => like.Tweet.id === tweet.id) ? (
          <FilledLike data-id={tweet.id} className="tweet-like-icon liked" onClick={(e) => {
            const clickedLikedIconId = e.currentTarget.dataset.id
            handleUnLikeAtUser(clickedLikedIconId)
          }}/>
        ): (
          <OutlinedLike data-id={tweet.id} className="tweet-like-icon unliked"
          onClick={(e) => {
            const clickedLikedIconId = e.currentTarget.dataset.id
            handleLikeAtUser(clickedLikedIconId)
          }}/>
        )}
              <span className='item-text'>{tweet.likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </TweetContainer>
  )
}
