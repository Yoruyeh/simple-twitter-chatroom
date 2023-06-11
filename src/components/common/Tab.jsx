import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate, NavLink, Outlet } from 'react-router-dom'
import { getTweetById } from '../../api/tweets'
import { checkPermission } from '../../api/checkPermission'
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

  a {
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
`

// 根據條件返回相應的內容
function ReturnItems() {
  const navigate = useNavigate()
  function computedClassName({ isActive }) {
    return isActive ? 'active' : ''
  }

  if (
    window.location.pathname.includes('followers') ||
    window.location.pathname.includes('followings')
  ) {
    return (
      <>
        <li>
          <NavLink
            className={computedClassName}
            onClick={() => navigate('/14/followers')}
          >
            追蹤者
          </NavLink>
        </li>
        <li>
          <NavLink
            className={computedClassName}
            onClick={() => navigate('/14/followings')}
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
          <NavLink className={computedClassName} to='/userid' end>
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

export default function Tab() {
  const [tweets, setTweets] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    let userId = ''

    // 取得推文函數
    async function getTweetByidAsync(userId) {
      const tweets = await getTweetById(userId)
      console.log(tweets)
      setTweets(tweets)
    }
    // 檢查 token 是否有效、並取得使用者資料
    async function checkTokenIsValid() {
      // 在本地瀏覽器取得 token
      const token = localStorage.getItem('token')
      // token 不存在，跳轉到 login
      if (!token) {
        navigate('/login')
      }
      // 驗證 token 是否有效
      // 無效則返回 login
      const result = await checkPermission(token)
      if (!result) {
        navigate('/login')
      }
      // 取得 id
      userId = result.id
      // 取得使用者資料
      // getUserASync(token, userId)
      console.log(userId)
      getTweetByidAsync()
    }
    checkTokenIsValid()
  }, [navigate, tweets])
  return (
    <>
      <StyledContainer className='container-fluid'>
        <ul className='d-flex link-wrapper'>
          <ReturnItems />
        </ul>
        <div className='tweet-wrapper'>
          {/* 嵌套路由組件呈現的位置 */}
          <Outlet></Outlet>
        </div>
      </StyledContainer>
    </>
  )
}
