import styled from 'styled-components'
import { useState } from 'react'
import Layout from '../layout/Layouts'
import Regist from '../components/Regist'
import Notification from '../components/common/Notifications'
import Modal from 'react-modal'

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

export default function RegistPage() {
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

  return (
    <>
      <StyledLayout className='justify-content-center'>
        <Regist openModal={openModal} />
      </StyledLayout>

      <Modal isOpen={modalIsOpen} style={customStyles}>
        <Notification status={notiStatus}>{notiText}</Notification>
      </Modal>
    </>
  )
}
