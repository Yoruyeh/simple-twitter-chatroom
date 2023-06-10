import { useState } from 'react'
import { useImmer } from 'use-immer'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
// import { login } from '../api/users'
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
const StyledLinkWrapper = styled.ul`
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
  },
  {
    label: '名稱',
    placeholder: '請輸入使用者名稱',
    type: 'text',
    status: '',
    errorText: '',
  },
  {
    label: 'Email',
    placeholder: '請輸入 Email',
    type: 'email',
    status: '',
    errorText: '',
  },
  {
    label: '密碼',
    placeholder: '請設定密碼',
    type: 'password',
    status: '',
    errorText: '',
  },
  {
    label: '密碼確認',
    placeholder: '請再次輸入密碼',
    type: 'password',
    status: '',
    errorText: '',
  },
]

export default function Regist() {
  const [account, setAccount] = useState('') // 帳號 value
  const [username, setUsername] = useState('') // 使用者名稱 value
  const [email, setEmail] = useState('') // Email value
  const [password, setPassword] = useState('') // 密碼 value
  const [checkPassword, setCheckPassword] = useState('') // 密碼確認 value
  const [inputList, UpdateInputList] = useImmer(inputs)

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
    if (target.placeholder === '請輸入帳號') {
      setInput(0)
      setAccount(target.value)
    } else if (target.placeholder === '請輸入使用者名稱') {
      setInput(1)
      setUsername(target.value)
    } else if (target.placeholder === '請輸入 Email') {
      setInput(2)
      setEmail(target.value)
    } else if (target.placeholder === '請設定密碼') {
      setInput(3)
      setPassword(target.value)
    } else if (target.placeholder === '請再次輸入密碼') {
      setInput(4)
      setCheckPassword(target.value)
    }
  }

  // 禁用所有input
  // function disabledAllInput(boolean) {
  //   if (boolean) {
  //     for (let i = 0; i < inputs.length; i++) {
  //       setInput(i, 'disabled')
  //     }
  //   } else {
  //     for (let i = 0; i < inputs.length; i++) {
  //       setInput(i, '')
  //     }
  //   }
  // }
  // Button事件
  async function handleClick() {
    // 判斷 input value 是否符合格式
    const regexAccount = /^[a-zA-Z0-9]{1,20}$/
    const regexUsername = /^.{1,50}$/
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const regexPassword = /^[a-zA-Z0-9]{8,20}$/
    // account 不符合
    if (!regexAccount.test(account)) {
      setInput(0, 'danger', '您輸入的帳號不正確 !')
    }
    // username 不符合
    if (!regexUsername.test(username)) {
      setInput(1, 'danger', '您輸入的使用者名稱不正確 !')
    }
    // email 不符合
    if (!regexEmail.test(email)) {
      setInput(2, 'danger', '您輸入的 Email 不正確 !')
    }
    // 密碼確認 不符合 (此行不能放最後比對)
    if (password !== checkPassword) {
      setInput(4, 'danger', '確認密碼與第一次輸入時不相同')
    }
    // password 不符合
    if (!regexPassword.test(password)) {
      setInput(3, 'danger', '密碼需要8-20位數字或字母')
      return
    }

    // try {
    //   // 禁用所有按鈕
    //   disabledAllInput(true)
    //   // 保存返回的 success、authToken 資料
    //   const { success, token } = await login({ account, password })
    //   // 取得成功，將 authToken 存進用戶的 localStorage
    //   if (success) {
    //     localStorage.setItem('token', token)
    //   }
    // } catch (error) {
    //   console.log('錯誤拉')
    // }
    // // 啟用所有按鈕
    // disabledAllInput()
  }

  return (
    <StyledContainer className='d-flex flex-column align-items-center'>
      <StyledHeader className='d-flex flex-column align-items-center'>
        <Logo />
        <h3>建立你的帳號</h3>
      </StyledHeader>

      <StyledBody className='d-flex flex-column align-items-center'>
        {inputList.map((input) => {
          return (
            <AuthInput
              key={input.label}
              type={input.type}
              placeholder={input.placeholder}
              label={input.label}
              status={input.status}
              errorText={input.errorText}
              onChange={(event) => {
                handleChange(event)
              }}
            />
          )
        })}
      </StyledBody>

      <StyledFooter className='d-flex flex-column align-items-center'>
        <AuthButton onClick={handleClick}>註冊</AuthButton>
        <StyledLinkWrapper className='d-flex justify-content-center'>
          <li>
            <NavLink to='/login'>取消</NavLink>
          </li>
        </StyledLinkWrapper>
      </StyledFooter>
    </StyledContainer>
  )
}
