import styled from 'styled-components'
import SettingLayout from '../layout/SettingLayout'
import { SettingHeader } from '../components/Header'
import Setting from '../components/Setting'
// button

const StyledSettingContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

`

const StyledMain = styled.div``

export default function SettingPage() {

  return (
    <SettingLayout>
      <StyledSettingContainer className='container-fuild'>
        <div className="header">
        <SettingHeader/>
        </div>
        <StyledMain>
          <Setting />
        </StyledMain>
      </StyledSettingContainer>
    </SettingLayout>
  )
}
