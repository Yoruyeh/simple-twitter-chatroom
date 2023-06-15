import Login from '../components/Login'
import Layout from '../layout/Layouts'
import styled from 'styled-components'
import { useState } from 'react'
import Modal from 'react-modal'
import Notification from '../components/common/Notifications'

const StyledLayout = styled(Layout)`
  padding-top: 64px;
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

export default function LoginPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [notiText, setNotiText] = useState('')
  const [notiStatus, setNotiStatus] = useState('')

  function openModal(notiText, notiStatus) {
    setModalIsOpen(true)
    setNotiText(notiText)
    setNotiStatus(notiStatus)
    setTimeout(() => {
      setModalIsOpen(false)
    }, 1300) // 一秒後關閉 Modal
  }

  Modal.setAppElement(document.body)

  return (
    <>
      <StyledLayout className='justify-content-center'>
        <Login openModal={openModal} />
      </StyledLayout>

      <Modal isOpen={modalIsOpen} style={customStyles}>
        <Notification status={notiStatus}>{notiText}</Notification>
      </Modal>
    </>
  )
}
