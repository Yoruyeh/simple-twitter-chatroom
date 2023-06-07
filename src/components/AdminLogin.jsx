import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

// logo
import { Logo } from '../assets/icons'
// button
import { AuthButton } from './common/button.styled'
// input 元件
import AuthInput from './AuthInput'

// Container
const StyledContainer = styled.div`
  max-width: 356px;
  padding: 0;
`
// Header
const StyledHeader = styled.div`
  svg {
    margin-bottom: 24px;
  }
`
// Body
const StyledBody = styled.div`
  width: 100%;
  gap: 32px;
  margin: 40px 0;

  label,
  input {
    padding: 0 10.55px;
  }
  label {
    padding-top: 6px;
  }
`

// Footer
const StyledFooter = styled.div`
  button {
    margin-bottom: 22px;
  }
`

// Link
const StyledLink = styled.ul`
  width: 100%;
  gap: 12px;

  span a {
    line-height: 24px;
  }

  a {
    text-decoration: none;
    color: var(--primary);
    border-bottom: 1px solid var(--primary);
  }
`

export default function AdminLogin() {
  return (
    <StyledContainer className='d-flex flex-column align-items-center'>
      <StyledHeader className='d-flex flex-column align-items-center'>
        <Logo />
        <h3>後台登入</h3>
      </StyledHeader>

      <StyledBody className='d-flex flex-column align-items-center'>
        <AuthInput label='帳號' placeholder='請輸入帳號' />
        <AuthInput label='密碼' placeholder='請輸入密碼' />
      </StyledBody>

      <StyledFooter className='d-flex flex-column align-items-center'>
        <AuthButton>註冊</AuthButton>
        <StyledLink className='d-flex justify-content-end'>
          <li>
            <NavLink to='/login'>前台登入</NavLink>
          </li>
        </StyledLink>
      </StyledFooter>
    </StyledContainer>
  )
}
