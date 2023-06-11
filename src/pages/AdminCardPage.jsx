import styled from 'styled-components'
import AdminUserCard from '../components/common/AdminUserCard'
import Navbar from '../components/Navbar'
const Container = styled.div`
  .title-wrapper {
    height: 74px;
  }

  .card-wrapper {
    gap: 16px;
  }

  @media screen and (min-width: 992px) and (max-width: 1199px) {
    max-width: 960px;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1140px;
  }
`

export default function AdminListPage() {
  return (
    <Container className='container-fluid px-0'>
      <div className='row'>
        <div className='col-2'>
          <Navbar></Navbar>
        </div>
        <div className='col-10'>
          <div className='title-wrapper d-flex align-items-center'>
            <h4 className='title'>使用者列表</h4>
          </div>
          <div className='card-wrapper row'>
            <AdminUserCard />
            <AdminUserCard />
            <AdminUserCard />
            <AdminUserCard />
            <AdminUserCard />
            <AdminUserCard />
            <AdminUserCard />
            <AdminUserCard />
          </div>
        </div>
      </div>
    </Container>
  )
}
