import styled from 'styled-components'
import Navbar from '../components/Navbar'

const StyledContainer = styled.div`
  @media screen and (min-width: 992px) and (max-width: 1199px) {
    max-width: 960px;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1140px;
  }
`

const SettingLayout = ({ children }) => {
  return (
    <StyledContainer className='container-fluid px-0'>
      <div className='row'>
        <div className='col-2 px-0'>
          <Navbar />
        </div>
        <div className='col-7 px-0'>{children}</div>
        <div className='col-3 px-0'></div>
      </div>
    </StyledContainer>
  )
}

export default SettingLayout
