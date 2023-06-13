import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { UserInfoCard } from '../components/common/UserInfoCard'
import Tab from '../components/common/Tab'
import MainLayout from '../layout/MainLayout'
import { UserHeader } from '../components/Header'
import { getUser } from '../api/users'
import { checkPermission } from '../api/checkPermission'

const StyledContainer = styled.div`
  .user-info {
    margin-bottom: 16px;
  }
`
export default function UserPage() {
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    let userId = ''

    // 取得 user 資料函數
    async function getUserASync(token, userId) {
      const data = await getUser(token, userId)
      setUserData(data)
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
      getUserASync(token, userId)
    }
    checkTokenIsValid()
  }, [navigate])

  return (
    <MainLayout>
      <StyledContainer className='container-fuild'>
        <div className='header'>
          <UserHeader />
        </div>
        <div className='user-info'>
          <UserInfoCard
            username={userData.name}
            userid={userData.id}
            intro={userData.introduction}
            following={userData.following}
            followers={userData.follower}
            cover={userData.cover}
            avatar={userData.avatar}
          />
        </div>
        <div className='user-tab'>
          <Tab></Tab>
        </div>
      </StyledContainer>
    </MainLayout>
  )
}
