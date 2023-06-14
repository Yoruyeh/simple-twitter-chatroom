import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { adminGetUsers } from '../api/admin'
import AdminUserCard from './common/AdminUserCard'

const StyledContainer = styled.div``
const StyledHeader = styled.header`
  height: 75px;
  padding: 24px 21.79px;
  border-bottom: 1px solid #e6ecf0;
`
const StyledMain = styled.main`
  padding: 16px;
`

export default function AdminCard() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    async function AsyncAdminGetUsers(token) {
      const data = await adminGetUsers(token)
      setUsers(data)
    }

    if (token) {
      AsyncAdminGetUsers(token)
    }
  }, []) // 空依賴數組確保只在組件掛載時執行

  return (
    <StyledContainer>
      <StyledHeader>
        <h4 className='title'>使用者列表</h4>
      </StyledHeader>
      <StyledMain>
        <ul className='row card-wrapper'>
          {users.map((user) => {
            return (
              <li
                key={user.id}
                className='col-xl-3 col-md-4 col-sm-6 col-6 p-2'
              >
                <AdminUserCard user={user} />
              </li>
            )
          })}
        </ul>
      </StyledMain>
    </StyledContainer>
  )
}
