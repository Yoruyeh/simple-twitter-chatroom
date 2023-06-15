import { useState } from 'react'
import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { OutlinedNoti, OutlinedMessage, FilledNoti } from '../../assets/icons'
import { PillButton } from './button.styled'

// container
const Container = styled.div`
  width: 100%;
`

//背景圖片
const StyledImgWrapper = styled.div`
  position: relative;
  .img {
    background-image: url(${({ cover }) => cover});
    aspect-ratio: 639 / 200;
    background-repeat: no-repeat;
    background-size: cover;
  }
`
const StyledAvatarWrapper = styled.div`
  // 頭像
  position: absolute;
  top: 60%;
  left: 1.7%;
  padding: 0;
  width: 21.909233%;
  .avatar {
    box-shadow: inset 0px 0px 0px 4px #fff;
    background-image: url(${({ avatar }) => avatar});
    background-size: cover;
    border-radius: 100%;
    aspect-ratio: 1 / 1;
    z-index: 999;
  }
`

// Actions 容器
const StyledActionWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  padding: 0 16px;
  gap: 16px;
`
// Icon Button 樣式
const IconButton = styled.button`
  padding: 8px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 1px solid var(--main);
  cursor: pointer;
  background-color: #fff;

  // 判斷是否是 checked 狀態
  ${({ noti }) =>
    noti === 'true' &&
    css`
      background-color: var(--main);
    `}

  // 改變 icon 顏色
  svg {
    translate: 0px -1px;
    pointer-events: none;
    path {
      // 判斷是否是 checked 狀態
      fill: ${({ noti }) => (noti === 'true' ? '#fff;' : 'var(--main);')};
    }
  }
`
const FollowButton = styled(PillButton)`
  // follow 狀態樣式
  ${({ follow }) =>
    follow === 'true' &&
    css`
      background-color: var(--main);
      color: #fff;
    `}// 取消追隨hover狀態
`

// 使用者 Info 區域
const StyledInfoWrapper = styled.div`
  margin-left: 16px;
  margin-top: 8px;
  .username {
    line-height: 26px;
  }

  .userid {
    font-size: 14px;
    line-height: 22px;
    color: var(--secondary);
  }

  .userintro {
    margin-top: 6px;
    margin-bottom: 8px;
    line-height: 22px;
    color: var(--dark-100);
  }

  a {
    margin-right: 20px;
    color: var(--dar-100);
    text-decoration: none;
    span {
      color: var(--secondary);
    }
    &:hover {
      text-decoration: underline;
    }
  }
`

// 根據條件返回 Button
function ReturnActions(other) {
  // Button狀態
  const [noti, setNoti] = useState(false)
  const [follow, setFollow] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  //   button 點擊事件
  function handleClick(e) {
    const target = e.target
    if (target.className.includes('notiButton')) {
      setNoti(!noti)
    }
    if (target.className.includes('followButton')) {
      if (target.innerText === '跟隨') {
        e.target.innerText = '正在跟隨'
      } else if (target.innerText === '取消跟隨') {
        e.target.innerText = '跟隨'
      }
      setFollow(!follow)
    }
  }
  // button hover事件
  const handleMouseEnter = (e) => {
    setIsHovered(true)
    if (e.target.innerText === '正在跟隨' && e.target.type === 'submit') {
      e.target.innerText = '取消跟隨'
    }
  }
  const handleMouseLeave = (e) => {
    setIsHovered(false)
    if (e.target.innerText === '取消跟隨' && e.target.type === 'submit') {
      e.target.innerText = '正在跟隨'
    }
  }

  if (other) {
    // other 頁面返回的 button
    return (
      <>
        <IconButton onClick={(e) => handleClick(e)}>
          <OutlinedMessage />
        </IconButton>
        <IconButton
          onClick={(e) => handleClick(e)}
          className='notiButton'
          noti={noti.toString()}
        >
          {noti ? <FilledNoti /> : <OutlinedNoti />}
        </IconButton>
        <FollowButton
          onClick={(e) => handleClick(e)}
          onMouseEnter={(e) => handleMouseEnter(e)}
          onMouseLeave={(e) => handleMouseLeave(e)}
          className='followButton'
          follow={follow.toString()}
          hover={isHovered.toString()}
        >
          跟隨
        </FollowButton>
      </>
    )
  } else {
    // 個人頁面返回的 button
    return <PillButton>編輯個人資料</PillButton>
  }
}

export function UserInfoCard({
  other = false,
  username,
  useraccount,
  intro,
  following,
  follower,
  cover,
  avatar,
  userId
}) {
  return (
    <Container>
      <StyledImgWrapper cover={cover}>
        <div className='img'></div>
        <StyledAvatarWrapper avatar={avatar}>
          <div className='avatar'></div>
        </StyledAvatarWrapper>
      </StyledImgWrapper>

      <StyledActionWrapper className='col-12 d-flex justify-content-end'>
        {ReturnActions(other)}
      </StyledActionWrapper>

      <StyledInfoWrapper>
        <h5 className='username'>{username}</h5>
        <span className='userid'>@{useraccount}</span>
        <p className='userintro'>{intro}</p>
        <NavLink to={`/${userId}/followings`}>
          {following} <span>個追隨中</span>
        </NavLink>
        <NavLink to={`/${userId}/followers`}>
          {follower} <span>位跟隨者</span>
        </NavLink>
      </StyledInfoWrapper>
    </Container>
  )
}

export function OtherUserInfoCard({
  other = true,
  username,
  useraccount,
  intro,
  following,
  follower,
  cover,
  avatar,
  userId
}) {
  return (
    <Container>
      <StyledImgWrapper cover={cover}>
        <div className='img'></div>
        <StyledAvatarWrapper avatar={avatar}>
          <div className='avatar'></div>
        </StyledAvatarWrapper>
      </StyledImgWrapper>

      <StyledActionWrapper className='col-12 d-flex justify-content-end'>
        {ReturnActions(other)}
      </StyledActionWrapper>

      <StyledInfoWrapper>
        <h5 className='username'>{username}</h5>
        <span className='userid'>@{useraccount}</span>
        <p className='userintro'>{intro}</p>
        <NavLink to={`/others/${userId}/followings`}>
          {following} <span>個追隨中</span>
        </NavLink>
        <NavLink to={`/others/${userId}/followers`}>
          {follower} <span>位跟隨者</span>
        </NavLink>
      </StyledInfoWrapper>
    </Container>
  )
}
