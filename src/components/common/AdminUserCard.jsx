import styled from 'styled-components'
import { FilledPost, OutlinedLike } from '../../assets/icons/index.js'

const StyledContainer = styled.div`
  max-width: 210px;
  padding: 0 0 24px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 10px 10px;
  margin: auto;
`

const StyledImgWrapper = styled.div`
  position: relative;
  .background-img {
    border-radius: 10px 10px 0 0;
    background-image: url(${(props) =>
      props.cover ? props.cover : 'https://i.imgur.com/BWEPlza.jpeg'});
    background-size: cover;
    aspect-ratio: 210 / 140;
  }

  .user-img-wrapper {
    position: absolute;
    top: 45%;
    left: 25%;
    buttom: 0;
    width: ${(100 / 210) * 100}%;
    aspect-ratio: 210 / 100;
    .user-img {
      box-shadow: inset 0px 0px 0px 4px #fff;
      background-image: url(${(props) => props.avatar});
      background-size: cover;
      aspect-ratio: 1 / 1;
      border-radius: 100%;
    }
  }
`
const StyledInfoWrapper = styled.div`
  margin-top: 32px;

  // 使用者名稱、ID
  .user-name {
    line-height: 24px;
  }
  .user-id {
    font-size: 14px;
    line-height: 22px;
  }

  // 圖標區域
  .icon-group {
    margin-top: 16px;

    .icon-wrapper {
      gap: 8px;

      svg {
        path {
          fill: var(--dark-80);
        }
      }

      .icon-text {
        transform: translateY(-1px);
      }
    }
  }

  // 跟隨者區域
  .follow-group {
    margin-top: 8px;
    font-size: 14px;

    .text {
      color: var(--secondary);
    }
  }
`

export default function AdminUserCard({ user }) {
  const tweetCounts = formatNumber(user.tweetCount)
  const likeCounts = formatNumber(user.likeCount)
  const follwerCounts = formatNumber(user.followerCount)
  const follwingCounts = formatNumber(user.followingCount)

  function formatNumber(num) {
    if (num >= 1000) {
      return Math.floor(num / 100) / 10 + 'k'
    } else {
      return num.toString()
    }
  }

  return (
    <StyledContainer>
      <StyledImgWrapper cover={user.cover} avatar={user.avatar}>
        <div className='background-img'></div>
        <div className='user-img-wrapper'>
          <div className='user-img'></div>
        </div>
      </StyledImgWrapper>

      <StyledInfoWrapper className='d-flex flex-column align-items-center'>
        <h6 className='user-name'>{user.name}</h6>
        <p className='user-id'>@{user.id}</p>

        <div className='icon-group row'>
          <div className='icon-wrapper d-flex col-6 align-items-center'>
            <FilledPost></FilledPost>
            <span className='icon-text'>{tweetCounts}</span>
          </div>
          <div className='icon-wrapper d-flex col-6 align-items-center'>
            <OutlinedLike></OutlinedLike>
            <span className='icon-text'>{likeCounts}</span>
          </div>
        </div>

        <div className='follow-group row'>
          <span className='col-6 following'>
            {follwerCounts} <span className='text'>個跟隨中</span>
          </span>
          <span className='col-6 follower'>
            {follwingCounts} <span className='text'>位跟隨者</span>
          </span>
        </div>
      </StyledInfoWrapper>
    </StyledContainer>
  )
}
