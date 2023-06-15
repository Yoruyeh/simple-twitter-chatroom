import { useState } from 'react'
import { useImmer } from 'use-immer'
import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

// logo
import { Logo } from '../assets/icons'
// button
import { AuthButton } from './common/button.styled'
// container
import { AuthContainer, AuthInputContainer } from './common/auth.styled'
// input 元件
import AuthInput from './AuthInput'
// api
import { login } from '../api/users'

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

const inputs = [
  {
    label: '帳號',
    placeholder: '請輸入帳號',
    type: 'text',
    status: '',
    errorText: '',
    value: '',
  },
  {
    label: '密碼',
    placeholder: '請輸入密碼',
    type: 'password',
    status: '',
    errorText: '',
    value: '',
  },
]

// Login元件
export default function Login() {
  const [account, setAccount] = useState('') // 帳號 value
  const [password, setPassword] = useState('') // 密碼 value
  const [inputList, UpdateInputList] = useImmer(inputs)
  const navigate = useNavigate()

  // 設置 input狀態 函數
  function setInput(num, status, errorText) {
    UpdateInputList((draft) => {
      draft[num].status = status
      draft[num].errorText = errorText
    })
  }

  // input事件
  function handleChange(event) {
    const target = event.target
    if (target.type === 'text') {
      UpdateInputList((draft) => {
        draft[0].value = target.value.replace(/\s*/g, '')
      })
      setInput(0)
      setAccount(target.value)
    } else if (target.type === 'password') {
      UpdateInputList((draft) => {
        draft[1].value = target.value.replace(/\s*/g, '')
      })
      setInput(1)
      setPassword(target.value)
    }
  }

  // Button事件
  async function handleClick() {
    // 判斷 account、password 是否符合格式
    const regexAccount = /^[a-zA-Z0-9]{1,20}$/
    const regexPassword = /^[a-zA-Z0-9]{8,20}$/

    // account 不符合
    if (!regexAccount.test(account)) {
      setInput(0, 'danger', '帳號需要1-20位數字或字母')
    }
    // password不符合
    if (!regexPassword.test(password)) {
      setInput(1, 'danger', '密碼要8-20位數字或字母')
      return
    }

    // 保存返回的 success、authToken 資料
    const { success, token, error } = await login({ account, password })
    // 取得成功，將 authToken 存進用戶的 localStorage，
    // 跳轉到 homePage
    if (success) {
      localStorage.setItem('token', token)
      navigate('/home')
    } else if (error) {
      if (error.message.includes('使用者')) {
        setInput(0, 'danger', '帳號不存在')
        setInput(1, '')
        return
      } else {
        setInput(1, 'danger', '密碼不相符')
        return
      }
    }
  }

  return (
    <StyledContainer>
      <Logo />
      <h3>登入 Alphitter</h3>
      <StyledInputContainer as='form' className='d-flex flex-column'>
        {inputList.map((input) => {
          return (
            <AuthInput
              key={input.label}
              type={input.type}
              placeholder={input.placeholder}
              label={input.label}
              status={input.status}
              errorText={input.errorText}
              value={input.value}
              onChange={(event) => {
                handleChange(event)
              }}
            />
          )
        })}
      </StyledInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <StyledLink className='d-flex justify-content-end'>
        <li>
          <NavLink to='/register'>註冊</NavLink>
        </li>
        <span>・</span>
        <li>
          <NavLink to='/admin/login'>後台登入</NavLink>
        </li>
      </StyledLink>
    </StyledContainer>
  )
}
