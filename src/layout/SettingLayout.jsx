import styled from 'styled-components'
import Navbar from '../components/Navbar'

const StyledSettingLayoutContainer = styled.div`
  .row {
    margin: 0 130px;
    height: 100vh;
  }
  .navbar-container {
    padding: 0;
    position: relative;
    border-right: 1px solid var(--gray1);
  }
  .side-container{
    border-left: 1px solid var(--gray1);
  }
  .header {
    border-bottom: 1px solid var(--gray1);
    height: 75px;
  }
  @media screen and (min-width: 992px) and (max-width: 1199px) {
    max-width: 960px;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1140px;
  }
`

const SettingLayout = ({ children }) => {
  return (
    <StyledSettingLayoutContainer className='container-fluid px-0'>
      <div className='row mx-0'>
        <div className='col-2 px-0 navbar-container'>
          <Navbar />
        </div>
        <div className='col-7 main-container px-0'>{children}</div>
        <div className='col-3 px-0 side-container'></div>
      </div>
    </StyledSettingLayoutContainer>
  )
}

export default SettingLayout
