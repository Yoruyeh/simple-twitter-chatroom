import styled from 'styled-components'
import { UserInfoCard } from '../components/common/UserInfoCard'
import Navbar from '../components/Navbar'
import {
  PopularFollower,
  PopularFollowerItem,
} from '../components/PopularFollower'
import Tab from '../components/common/Tab'

const StyledContainer = styled.div`
  .main-container {
    width: 639px;
  }
  .main-info {
    margin-bottom: 16px;
  }
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
        <div className='col-2 px-0'>
          <Navbar />
        </div>

        <div className='col-7 px-0'>
          <div className='container-fluid px-0 main-container'>
            <div className='row'>
              <div className='col-12 main-header'>
                <h5>= =</h5>
              </div>
              <div className='col-12 main-info'>
                <UserInfoCard />
              </div>
              <div className='col-12 main-tab '>
                <Tab></Tab>
              </div>
            </div>
          </div>
        </div>

        <div className='col-3 px-0'>
          <PopularFollower>
            <PopularFollowerItem />
            <PopularFollowerItem />
            <PopularFollowerItem />
          </PopularFollower>
        </div>
      </div>
    </StyledContainer>
  )
}
