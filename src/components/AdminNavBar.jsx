import styled from 'styled-components'
import {
  Logo,
  OutlinedHome,
  OutlinedUser,
  FilledHome,
  FilledUser,
  OutlinedLogout,
} from '../assets/icons'
import { NavLink, useMatch, useNavigate } from 'react-router-dom'

const StyledContainer = styled.div`
  position: sticky;
  top: 0;
  height: 96vh;
  margin-top: 16px;
  padding: 0 16px;
`
const StyledActionsWrapper = styled.ul`
  gap: 24px;

  .log {
    margin: 8px 0 0 8px;
  }

  .action {
    gap: 16px;
    text-decoration: none;
    color: var(--dark-90);

    .outline-icon {
      path {
        fill: var(--dark-90);
      }
    }
  }

  .active {
    color: var(--main);
    .fill-icon {
      path {
        fill: var(--main);
      }
    }
  }
`
const StyledLogoutWrapper = styled.div`
  gap: 16px;
  cursor: pointer;

  .logout-icon {
    path {
      fill: var(--dark-90);
    }
  }
  .logout {
    color: var(--dark-90);
  }

  &:hover {
    .logout-icon {
      path {
        fill: var(--main);
      }
    }
    .logout {
      color: var(--main);
    }
  }
`

export default function AdminNavBar() {
  const navigate = useNavigate()

  // 拿掉 adminToken
  function handleRemoveToken() {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  return (
    <StyledContainer className='d-flex flex-column justify-content-between'>
      <StyledActionsWrapper className='d-flex flex-column'>
        <li>
          <Logo className='logo'></Logo>
        </li>
        <li>
          <NavLink to='list' className='action d-flex align-items-center' end>
            {useMatch('/admin/list') ? (
              <FilledHome className='fill-icon active' />
            ) : (
              <OutlinedHome className='outline-icon' />
            )}
            <h5>推文清單</h5>
          </NavLink>
        </li>
        <li>
          <NavLink to='cards' className='action d-flex align-items-center'>
            {useMatch('/admin/cards') ? (
              <FilledUser className='fill-icon active' />
            ) : (
              <OutlinedUser className='outline-icon' />
            )}
            <h5>使用者列表</h5>
          </NavLink>
        </li>
      </StyledActionsWrapper>

      <StyledLogoutWrapper
        className='d-flex align-items-center'
        onClick={handleRemoveToken}
      >
        <OutlinedLogout className='logout-icon' />
        <h5 className='logout'>登出</h5>
      </StyledLogoutWrapper>
    </StyledContainer>
  )
}
