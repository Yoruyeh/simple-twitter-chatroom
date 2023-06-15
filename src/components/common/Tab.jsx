import styled from 'styled-components'
import { useEffect } from 'react'
import { useNavigate, NavLink, Outlet } from 'react-router-dom'
import { checkPermission } from '../../api/checkPermission'
import { useAuth } from '../../context/AuthContext'
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
function ReturnItems({ handleOpenReplyModal }) {
  const navigate = useNavigate()
  function computedClassName({ isActive }) {
    return isActive ? 'tab-botton active' : 'tab-botton'
  }
const { currentMember } = useAuth()
  if (
    window.location.pathname.includes('followers') ||
    window.location.pathname.includes('followings')
  ) {
    return (
      <>
        <li>
          <NavLink
            className={computedClassName}
            onClick={() => navigate(`/${currentMember.id}/followers`)}
          >
            追蹤者
          </NavLink>
        </li>
        <li>
          <NavLink
            className={computedClassName}
            onClick={() => navigate(`/${currentMember.id}/followings`)}
          >
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
          <NavLink className={computedClassName} end to=''>
            推文
          </NavLink>
        </li>
        <li>
          <NavLink className={computedClassName} to='replies'>
            回覆
          </NavLink>
        </li>
        <li>
          <NavLink className={computedClassName} to='likes'>
            喜歡的內容
          </NavLink>
        </li>
      </>
    )
  }
}

export default function Tab({ handleOpenReplyModal }) {
  const navigate = useNavigate()

  useEffect(() => {
    // 檢查 token 是否有效，取得結果
    const result = async function checkTokenIsValid() {
      // 在本地瀏覽器取得 token
      const token = localStorage.getItem('token')
      // token 不存在，跳轉到 login
      if (!token) {
        return
      }

      // 驗證 token 是否有效
      const result = await checkPermission(token)
      if (!result) {
        return
      }
      return true
    }
    // 驗證失敗，跳轉 login頁面
    if (!result) {
      navigate('/login')
    }
  }, [navigate])

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
