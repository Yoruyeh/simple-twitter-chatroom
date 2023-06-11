import styled from 'styled-components'
import SettingLayout from '../layout/SettingLayout'
import Setting from '../components/Setting'
// button

const StyledContainer = styled.div``

const StyledHeader = styled.div`
  height: 51px;
  border-bottom: 1px solid var(--gray1);

  h4 {
  }
`
const StyledMain = styled.div``

export default function SettingPage() {
  return (
    <SettingLayout>
      <StyledContainer className='container-fuild'>
        <StyledHeader className='d-flex align-items-center'>
          <h4>帳戶設定</h4>
        </StyledHeader>
        <StyledMain>
          <Setting />
        </StyledMain>
      </StyledContainer>
    </SettingLayout>
  )
}
