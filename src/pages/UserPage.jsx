import styled from 'styled-components'
import { UserInfoCard } from '../components/common/UserInfoCard'

const StyledContainer = styled.div`
  @media screen and (min-width: 992px) and (max-width: 1199px) {
    max-width: 960px;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1140px;
  }
`
export default function UserPage() {
  return (
    <StyledContainer className='container-fluid px-0'>
      <div className='row'>
        <div className='col-2 px-0'></div>

        <div className='col-7 px-0'>
          <UserInfoCard />
        </div>

        <div className='col-3 px-0'></div>
      </div>
    </StyledContainer>
  )
}
