import { useState } from 'react'
import { useImmer } from 'use-immer'
import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Notification from '../components/common/Notifications'
import Modal from 'react-modal'

// logo
import { Logo } from '../assets/icons'
// button
import { AuthButton } from './common/button.styled'
// input 元件
import AuthInput from './AuthInput'
import { adminLogin } from '../api/admin'

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

const customStyles = {
  overlay: {
    backgroundColor: 'transparent', // 設置背景為透明
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    border: 'none', // 移除邊框
    background: 'none', // 移除背景
    boxShadow: 'none', // 移除陰影
  },
}

const inputs = [
  {
    label: '帳號',
    placeholder: '請輸入帳號',
    type: 'text',
    status: '',
    errorText: '',
  },
  {
    label: '密碼',
    placeholder: '請輸入密碼',
    type: 'password',
    status: '',
    errorText: '',
  },
]

export default function AdminLogin() {
  const [account, setAccount] = useState('') // 帳號 value
  const [password, setPassword] = useState('') // 密碼 value
  const [inputList, UpdateInputList] = useImmer(inputs)
  const navigate = useNavigate()
  // modal相關
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [notiText, setNotiText] = useState('')
  const [notiStatus, setNotiStatus] = useState('')

  function openModal(notiText, notiStatus) {
    setModalIsOpen(true)
    setNotiText(notiText)
    setNotiStatus(notiStatus)
    setTimeout(() => {
      setModalIsOpen(false)
    }, 1300)
  }

  Modal.setAppElement('#root')

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
      setInput(0)
      setAccount(target.value)
    } else if (target.type === 'password') {
      setInput(1)
      setPassword(target.value)
    }
  }
  // 禁用所有input
  function disabledAllInput(boolean) {
    if (boolean) {
      for (let i = 0; i < inputs.length; i++) {
        setInput(i, 'disabled')
      }
    } else {
      for (let i = 0; i < inputs.length; i++) {
        setInput(i, '')
      }
    }
  }
  // Button事件
  async function handleClick() {
    let isValid = true

    // 判斷 account、password 是否符合格式
    const regexAccount = /^[a-zA-Z0-9]{1,20}$/
    const regexPassword = /^[a-zA-Z0-9]{8,20}$/
    // account 不符合
    if (!regexAccount.test(account)) {
      setInput(0, 'danger', '帳號請輸入 1-20 個字 !')
      isValid = false
    }
    // password不符合
    if (!regexPassword.test(password)) {
      setInput(1, 'danger', '密碼請輸入 8-20 個字 !')
      isValid = false
    }

    if (isValid) {
      // 請求開始、禁用input
      disabledAllInput(true)
      // 保存返回的 success、authToken 資料
      const { success, token, error } = await adminLogin(account, password)
      // 取得成功，將 authToken 存進用戶的 localStorage
      if (success) {
        openModal('登入成功', 'success')
        localStorage.setItem('adminToken', token)
        setTimeout(() => {
          navigate('/admin/list')
        }, 1000)
      } else {
        if (error.response.data.message.includes('Admin')) {
          openModal('帳號不存在', 'danger')
          setInput(0, 'danger', '帳號不存在 !')
          setInput(1)
          isValid = false
        } else if (error.response.data.message.includes('Password')) {
          openModal('密碼不符合', 'danger')
          setInput(1, 'danger', '密碼不符合 !')
          setInput(0)
          isValid = false
        }
      }
    }

    if (isValid) {
      // 請求結束、啟用input
      disabledAllInput(true)
    }
  }
  return (
    <>
      <StyledContainer className='d-flex flex-column align-items-center'>
        <StyledHeader className='d-flex flex-column align-items-center'>
          <Logo />
          <h3>後台登入</h3>
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
          <AuthButton onClick={handleClick}>登入</AuthButton>
          <StyledLink className='d-flex justify-content-end'>
            <li>
              <NavLink to='/login'>前台登入</NavLink>
            </li>
          </StyledLink>
        </StyledFooter>
      </StyledContainer>

      <Modal isOpen={modalIsOpen} style={customStyles}>
        <Notification status={notiStatus}>{notiText}</Notification>
      </Modal>
    </>
  )
}
