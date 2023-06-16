import styled from 'styled-components'
import SettingLayout from '../layout/SettingLayout'
import { SettingHeader } from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Setting from '../components/Setting'
// button

const StyledSettingContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

`

const StyledMain = styled.div``

export default function SettingPage() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

   useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      localStorage.removeItem('activeNavItem')
      logout()
    }
  }, [navigate, isAuthenticated, logout]);

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
