import { useState } from 'react'
import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { OutlinedNoti, OutlinedMessage, FilledNoti } from '../../assets/icons'
import { PillButton, FollowButton } from './button.styled'
import { useGetUserTweets } from '../../context/GetUserTweets'
import { Follow, UnFollow, getUserFollowingsById } from '../../api/user.follower'

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
function ReturnActions( ) {
  const [noti, setNoti] = useState(false)
  function handleClick() {
    setNoti(!noti)
  }

  const {currentMemberInfo, currentMemberFollowings, setCurrentMemberFollowings, userInfo} = useGetUserTweets()
  const [isLoading, setIsLoading] = useState(false)

  const handleFollowClicked = async (id) => {
    setIsLoading(true)
    if (currentMemberInfo.id === id) {
      return
    }
    try {
      await Follow({ 
        id: id 
      })
      const followings = await getUserFollowingsById(currentMemberInfo.id)
      setCurrentMemberFollowings(followings)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUnFollowClicked = async (id) => {
    setIsLoading(true)
    try {
      await UnFollow(id)
      const followings = await getUserFollowingsById(currentMemberInfo.id)
      setCurrentMemberFollowings(followings)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <IconButton>
        <OutlinedMessage />
      </IconButton>
      <IconButton
        onClick={(e) => handleClick(e)}
        className='notiButton'
        noti={noti.toString()}>
        {noti ? <FilledNoti /> : <OutlinedNoti />}
      </IconButton>
      { !isLoading && currentMemberFollowings.some(item => item.followingId === userInfo.id) ? (
        <FollowButton 
        onClick={() => {
          handleUnFollowClicked(userInfo.id)
        }}> 正在跟隨 </FollowButton>
      ) : (
        <FollowButton className="unfollowed" 
        onClick={() => {
          handleFollowClicked(userInfo.id)
        }}> 跟隨 </FollowButton>
      )}
    </>
)

}

export function UserInfoCard({ currentMemberInfo }) {
  return (
    <Container>
      <StyledImgWrapper cover={currentMemberInfo.cover}>
        <div className='img'></div>
        <StyledAvatarWrapper avatar={currentMemberInfo.avatar}>
          <div className='avatar'></div>
        </StyledAvatarWrapper>
      </StyledImgWrapper>

      <StyledActionWrapper className='col-12 d-flex justify-content-end'>
        <PillButton>編輯個人資料</PillButton>
      </StyledActionWrapper>

      <StyledInfoWrapper>
        <h5 className='username'>{currentMemberInfo.name}</h5>
        <span className='userid'>@{currentMemberInfo.account}</span>
        <p className='userintro'>{currentMemberInfo.introduction}</p>
        <NavLink to={`/${currentMemberInfo.id}/followings`}>
          {currentMemberInfo.following} <span>個追隨中</span>
        </NavLink>
        <NavLink to={`/${currentMemberInfo.id}/followers`}>
          {currentMemberInfo.follower} <span>位跟隨者</span>
        </NavLink>
      </StyledInfoWrapper>
    </Container>
  )
}

export function OtherUserInfoCard({ userInfo }) {
  return (
    <Container>
      <StyledImgWrapper cover={userInfo.cover}>
        <div className='img'></div>
        <StyledAvatarWrapper avatar={userInfo.avatar}>
          <div className='avatar'></div>
        </StyledAvatarWrapper>
      </StyledImgWrapper>

      <StyledActionWrapper className='col-12 d-flex justify-content-end'>
        {ReturnActions()}
      </StyledActionWrapper>

      <StyledInfoWrapper>
        <h5 className='username'>{userInfo.name}</h5>
        <span className='userid'>@{userInfo.account}</span>
        <p className='userintro'>{userInfo.introduction}</p>
        <NavLink to={`/others/${userInfo.id}/followings`}>
          {userInfo.following} <span>個追隨中</span>
        </NavLink>
        <NavLink to={`/others/${userInfo.id}/followers`}>
          {userInfo.follower} <span>位跟隨者</span>
        </NavLink>
      </StyledInfoWrapper>
    </Container>
  )
}
