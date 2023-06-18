import { useImmer } from 'use-immer'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Modal from 'react-modal'
// input 元件
import { AuthInput } from './AuthInput'
import Notification from '../components/common/Notifications'
// button
import { PillButton } from '../components/common/button.styled'
// 驗證token api
import { checkPermission } from '../api/checkPermission'
import { settingPage } from '../api/users'

const StyledForm = styled.form`
  gap: 32px;

  label,
  input {
    padding: 0 10.55px;
  }
  label {
    padding-top: 6px;
  }
`
// Modal樣式
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
    value: '',
  },
  {
    label: '名稱',
    placeholder: '請輸入使用者名稱',
    type: 'text',
    status: '',
    errorText: '',
    value: '',
  },
  {
    label: 'Email',
    placeholder: '請輸入 Email',
    type: 'text',
    status: '',
    errorText: '',
    value: '',
  },
  {
    label: '密碼',
    placeholder: '請設定密碼',
    type: 'password',
    status: '',
    errorText: '',
    value: '',
  },
  {
    label: '密碼確認',
    placeholder: '請再次輸入密碼',
    type: 'password',
    status: '',
    errorText: '',
    value: '',
  },
]
export default function Setting() {
  const [inputList, UpdateInputList] = useImmer(inputs)
  const navigate = useNavigate()
  // modal相關
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [notiText, setNotiText] = useState('')
  const [notiStatus, setNotiStatus] = useState('')
  // 使用者資料
  const { currentMember } = useAuth()

  function openModal(notiText, notiStatus) {
    setModalIsOpen(true)
    setNotiText(notiText)
    setNotiStatus(notiStatus)
    setTimeout(() => {
      setModalIsOpen(false)
    }, 1300)
  }

  // 進入頁面驗證token
  useEffect(() => {
    if (currentMember) {
      async function asyncCheckPermission() {
        // 拿取token
        const token = localStorage.getItem('token')
        if (token) {
          // token拿取成功
          const { success } = await checkPermission(token)
          if (!success) {
            // token無效
            navigate('/login')
          }
        }
      }
      asyncCheckPermission()

      // 設定input的value為使用者資料
      UpdateInputList((draft) => {
        draft[0].value = currentMember.account
      })
      UpdateInputList((draft) => {
        draft[1].value = currentMember.name
      })
      UpdateInputList((draft) => {
        draft[2].value = currentMember.email
      })
    }
  }, [navigate, UpdateInputList, currentMember])

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
      UpdateInputList((draft) => {
        draft[0].value = target.value.replace(/\s*/g, '')
      })
      setInput(0)
    } else if (target.placeholder === '請輸入使用者名稱') {
      UpdateInputList((draft) => {
        draft[1].value = target.value
      })
      setInput(1)
    } else if (target.placeholder === '請輸入 Email') {
      UpdateInputList((draft) => {
        draft[2].value = target.value.replace(/\s*/g, '')
      })
      setInput(2)
    } else if (target.placeholder === '請設定密碼') {
      UpdateInputList((draft) => {
        draft[3].value = target.value.replace(/\s*/g, '')
      })
      setInput(3)
    } else if (target.placeholder === '請再次輸入密碼') {
      UpdateInputList((draft) => {
        draft[4].value = target.value.replace(/\s*/g, '')
      })
      setInput(4)
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

    // 判斷 input value 是否符合格式
    const regexAccount = /^(?=.*[a-zA-Z])(?=.*\d).{1,20}$/
    const regexUsername = /^.{1,50}$/
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const regexPassword = /^[a-zA-Z0-9]{8,20}$/
    // account 不符合
    if (!regexAccount.test(inputList[0].value)) {
      setInput(0, 'danger', '帳號請輸入 1-20 個數字 + 字母 !')
      isValid = false
    }
    // username 不符合
    if (!regexUsername.test(inputList[1].value)) {
      setInput(1, 'danger', '使用者名稱請輸入 1-50 個字 !')
      isValid = false
    }
    // email 不符合
    if (!regexEmail.test(inputList[2].value)) {
      setInput(2, 'danger', '您輸入的 Email 格式不正確 !')
      isValid = false
    }
    // 密碼確認 不符合 (此行不能放最後比對)
    if (inputList[4].value !== inputList[3].value) {
      setInput(4, 'danger', '確認密碼與第一次輸入時不相同 !')
      isValid = false
    }
    // password 不符合
    if (!regexPassword.test(inputList[3].value)) {
      setInput(3, 'danger', '密碼請輸入 8-20 個字 !')
      isValid = false
    }

    let userid = ''
    let token = ''
    if (isValid) {
      // 1. 透過token拿到userid
      const getToken = localStorage.getItem('token')

      if (getToken) {
        // token拿取成功
        const { success, data } = await checkPermission(getToken)
        if (success) {
          // token有效
          userid = data.id
          token = getToken
        } else {
          // token無效
          setTimeout(() => {
            openModal('Token已過期，請重新登入', 'danger')
          }, 1000)
          navigate('/login')
          isValid = false
        }
      } else {
        // token拿取失敗
        navigate('/login')
        isValid = false
      }
    }
    // 2. 將userid跟input value傳遞給setting api，設定資料
    if (isValid) {
      disabledAllInput(true)
      const { success, message } = await settingPage({
        token,
        userid,
        name: inputList[1].value,
        account: inputList[0].value,
        password: inputList[3].value,
        email: inputList[2].value,
      })
      if (success) {
        navigate('/setting')
        openModal(`${message}`, 'success')
      } else {
        openModal(`${message}`, 'danger')
      }
      disabledAllInput()
    }
  }

  return (
    <>
      <StyledForm
        className='d-flex flex-column p-4'
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
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
        <div className='buttonWrapper d-flex justify-content-end'>
          <PillButton
            type='submit'
            filled='true'
            large='true'
            onClick={handleClick}
          >
            儲存
          </PillButton>
        </div>
      </StyledForm>

      <Modal isOpen={modalIsOpen} style={customStyles}>
        <Notification status={notiStatus}>{notiText}</Notification>
      </Modal>
    </>
  )
}
