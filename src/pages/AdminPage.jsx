import styled from 'styled-components'
import AdminNavBar from '../components/AdminNavBar'
import { Outlet } from 'react-router-dom'

const StyledContainer = styled.div`
  @media screen and (min-width: 992px) and (max-width: 1199px) {
    max-width: 960px;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1140px;
  }
`
const StyledNavBarWrapper = styled.div``
const StyledMainWrapper = styled.div`
  border: 1px solid #e6ecf0;
`

export default function AdminPage() {
  return (
    <StyledContainer className='container-fuild mx-auto'>
      <div className='row'>
        <StyledNavBarWrapper className='col-2'>
          <AdminNavBar />
        </StyledNavBarWrapper>
        <StyledMainWrapper className='col-10 px-0'>
          {/* 路由組件渲染位置 */}
          <Outlet />
        </StyledMainWrapper>
      </div>
    </StyledContainer>
  )
}
