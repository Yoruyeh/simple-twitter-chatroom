import styled from 'styled-components'
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import SettingLayout from '../layout/SettingLayout'
import { SettingHeader } from '../components/Header'
import Setting from '../components/Setting'
import { useAuth } from '../context/AuthContext'
// button

const StyledSettingContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

`

const StyledMain = styled.div``

export default function SettingPage() {
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  })

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
