import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { adminGetUsers } from '../api/admin'
import AdminUserCard from './common/AdminUserCard'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    async function AsyncAdminGetUsers(token) {
      const { status, data } = await adminGetUsers(token)
      if (status === 200) {
        setUsers(data)
      } else if (status === 401) {
        navigate('/admin/login')
      }
    }

    if (token) {
      AsyncAdminGetUsers(token)
    } else {
      navigate('/admin/login')
    }
  }, [])

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
