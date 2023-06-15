import styled from 'styled-components'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useGetUserTweets } from '../../context/GetUserTweets'
// 顏色變量
const dividerColor = '#E6ECF0'
const fontDefaultColor = '#657786'

// Container
const StyledContainer = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding: 0;

  color: ${fontDefaultColor};
  border-bottom: solid 1px ${dividerColor};

  .tab-botton {
    display: flex;
    justify-content: center;
    align-items: center;

    color: #657786;
    font-size: 15px;
    width: 130px;
    max-width: 130px;
    height: 52px;
    text-decoration: none;
  }
  .active {
    border-bottom: 2px solid var(--main);
    color: var(--main);
  }
  .user-tab {
    padding-top: 16px;
  }
`

// 根據條件返回相應的內容
function ReturnItems() {
  function computedClassName({ isActive }) {
    return isActive ? 'tab-botton active' : 'tab-botton'
  }
const { currentMemberInfo, userInfo }  = useGetUserTweets()
const pathname = useLocation().pathname

  if (
    pathname.includes('followers') ||
    pathname.includes('followings')
  ) {
    return (
      <>
        <li>
          <NavLink
            className={computedClassName}
            to={pathname.includes('others') ? `/others/${userInfo.id}/followers` : `/${currentMemberInfo.id}/followers`}>
            追蹤者
          </NavLink>
        </li>
        <li>
          <NavLink
            className={computedClassName}
            to={pathname.includes('others') ? `/others/${userInfo.id}/followings` : `/${currentMemberInfo.id}/followings`}>
            正在追蹤
          </NavLink>
        </li>
        <li>
          <NavLink></NavLink>
        </li>
      </>
    )
  } else {
    return (
  <>
    <li>
      <NavLink className={computedClassName} end to={pathname.includes('others') ? `/others/${userInfo.id}` : `/${currentMemberInfo.id}`}>推文</NavLink>
    </li>
    <li>
      <NavLink className={computedClassName} to='replies'>回覆</NavLink>
    </li>
    <li>
      <NavLink className={computedClassName} to='likes'>喜歡的內容</NavLink>
    </li>
  </>
);
    }
}

export default function Tab({ handleOpenReplyModal }) {

  return (
    <>
      <StyledContainer className='container-fluid'>
        <ul className='d-flex link-wrapper'>
          <ReturnItems handleOpenReplyModal={handleOpenReplyModal}/>
        </ul>
        <div className='user-tab d-flex flex-column'>
          {/* 嵌套路由組件呈現的位置 */}
          <Outlet></Outlet>
        </div>
      </StyledContainer>
    </>
  )
}
