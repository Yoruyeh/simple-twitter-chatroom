import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { OutlinedClose } from '../../assets/icons'

const TweetContainer = styled(Link)`
  color: var(--dark-100);
  text-decoration: none;
  border-bottom: 1px solid var(--gray1);
  width: 100%;
  padding: 16px 0;

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

      .close-icon {
        position: absolute;
        right: 1px;
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
  }
`

export default function AdminTweetsItems({ tweet, replyid, button }) {
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
          <span className='close-icon'>
            <OutlinedClose />
          </span>
        </div>

        <div className='tweet-main'>
          <p className='tweet-text'>{tweet.description}</p>
        </div>
      </div>
    </TweetContainer>
  )
}
