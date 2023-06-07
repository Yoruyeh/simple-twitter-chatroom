import { NavLink } from 'react-router-dom'

import styled from 'styled-components'
// logo
import { Logo } from '../assets/icons'
// button
import { AuthButton } from './common/button.styled'
// container
import { AuthContainer, AuthInputContainer } from './common/auth.styled'
// input 元件
import AuthInput from './AuthInput'

// auth container
const StyledContainer = styled(AuthContainer)`
  max-width: 356px;
  padding: 0;

  svg {
    margin-bottom: 24px;
  }

  button {
    margin-bottom: 22px;
  }
`

// input container
const StyledInputContainer = styled(AuthInputContainer)`
  margin: 40px 0;
  gap: 32px;

  label,
  input {
    padding: 0 10.55px;
  }
  label {
    padding-top: 6px;
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

export default function Login() {
  return (
    <StyledContainer>
      <Logo />
      <h3>登入 Alphitter</h3>
      <StyledInputContainer as='form' className='d-flex flex-column'>
        <AuthInput label='帳號' placeholder='請輸入帳號' />
        <AuthInput label='密碼' placeholder='請輸入密碼' />
      </StyledInputContainer>
      <AuthButton>登入</AuthButton>
      <StyledLink className='d-flex justify-content-end'>
        <li>
          <NavLink to='/register'>註冊</NavLink>
        </li>
        <span>・</span>
        <li>
          <NavLink to='/admin'>後台登入</NavLink>
        </li>
      </StyledLink>
    </StyledContainer>
  )
}
