import styled from 'styled-components'
// logo
import { LogoIcon } from '../assets/icons'
// button
import { AuthButton } from './common/button.styled'
// container、LinkText
import {
  AuthContainer,
  AuthInputContainer,
  AuthLinkText,
} from './common/auth.styled'
// input 元件
import AuthInput from './AuthInput'

// 標題
const Title = styled.h3`
  font-size: 28px;
  font-weight: bold;
  margin-top: 24px;
`

// auth container
const Container = styled(AuthContainer)`
  max-width: 356px;
  padding: 0;
`

// input container
const InputContainer = styled(AuthInputContainer)`
  margin-top: 40px;
`

// LinkTextContainer
const LinkTextContainer = styled.div`
  margin-top: 8px;
  width: 100%;
  gap: 12px;
`

// AuthLinkText
const LinkText = styled(AuthLinkText)`
  margin: 0;
`

function LinkGroup() {
  return (
    <LinkTextContainer
      className={'d-flex align-items-center justify-content-end'}
    >
      <LinkText>註冊</LinkText>
      <span>•</span>
      <LinkText>後台登入</LinkText>
    </LinkTextContainer>
  )
}

export default function Login() {
  return (
    <Container>
      <LogoIcon />
      <Title>登入 Alphitter</Title>
      <InputContainer as='form'>
        <AuthInput label='帳號' placeholder='請輸入帳號' />
        <AuthInput label='密碼' placeholder='請輸入密碼' />
      </InputContainer>
      <AuthButton>登入</AuthButton>
      <LinkGroup />
    </Container>
  )
}
