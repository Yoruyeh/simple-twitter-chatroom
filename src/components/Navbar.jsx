import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
  Logo,
  OutlinedHome, FilledHome,
  OutlinedUser, FilledUser,
  OutlinedCog, FilledCog,
  OutlinedLogout
} from '../assets/icons';
import { NavbarButton } from "./common/button.styled"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const StyledNavbar = styled.nav`
  width: 100%;
  height: 100vh;
  position: static;
  .nav-tweet-button {
    position: absolute;
    top: 264px;
    right: 24px;
  }
`;

const StyledNavList = styled.ul`
  display: inline-block;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const StyledNavItem = styled.li`
  color: var(--dark-90);
  font-size: 18px;
  font-weight: 700;
  margin: 10px 6px;
  min-width: 178px;
  display: flex;
  align-items: center;

  &:last-child {
    position: absolute;
    bottom: 0;
  }

  .clicked {
    color: var(--main);
    & svg > path {
      fill: var(--main);
      stroke: var(--main);
    }
  }

    &:hover {
      cursor: pointer;
      color: var(--main);
      & svg > path {
        fill: var(--main);
    }
  }
`;

const StyledLogo = styled.div`
  padding: 10px 16px;
  display: flex;
  align-items: center;
`

const StyledText = styled.p`
  margin-left: 2px;
`;


const Navbar = ({ handleOpenTweetModal }) => {
  const { currentMember, isAuthenticated } = useAuth()

  const DefaultNavItems = [
  {
    id: "1",
    text: "首頁",
    link: "/home", 
    isVisited: true,
    icons: {
      outlined: <OutlinedHome />,
      filled: <FilledHome />
    }
  },
  {
    id: "2",
    text: "個人資料",
    link: `/${currentMember.id}`, 
    isVisited: false,
    icons: {
      outlined: <OutlinedUser />,
      filled: <FilledUser />
    }
  },
  {
    id: "3",
    text: "設定",
    link: "/setting", 
    isVisited: false,
    icons: {
      outlined: <OutlinedCog />,
      filled: <FilledCog />
    }
  },
  {
    id: "4",
    text: "登出",
    link: "/login", 
    isVisited: false,
    icons: {
      outlined: <OutlinedLogout />,
      filled: <OutlinedLogout />,
    }
  }
]
  const [navItems, setNavItems] = useState(DefaultNavItems)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleClick = (id) => {
  setIsLoading(true)
  setNavItems((prevItems) => {
    return prevItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isVisited: true,
        }
      } else {
        return {
          ...item,
          isVisited: false,
        }
      }
    })
  })
  // 在 localStorage 中保存狀態
  localStorage.setItem('activeNavItem', id);
  setIsLoading(false)
}

useEffect(() => {
  if (isAuthenticated) {
    const activeNavItem = localStorage.getItem('activeNavItem');
  if (activeNavItem) {
    setNavItems(prevItems => {
      return prevItems.map((item) => {
        if (item.id === activeNavItem) {
          return {
            ...item,
            isVisited: true,
          }
        } else {
          return {
            ...item,
            isVisited: false,
          }
        }
      })
    })
  }
  }
}, [isAuthenticated]);


  return (
    <StyledNavbar>
      <StyledLogo>
        <Logo />
      </StyledLogo>
      <StyledNavList>
        {navItems.map(item => {
          return (!isLoading && (
            <StyledNavItem key={item.id} 
              onClick={() => {
                handleClick(item.id)
                navigate(item.link)
              }} >
                <StyledLogo className={item.isVisited ? 'clicked' : ''}>
                  {item.isVisited ? (
                    item.icons.filled
                  ) : (
                    item.icons.outlined
                  )}
                </StyledLogo>
                <StyledText className={item.isVisited ? 'clicked' : ''}>
                  {item.text}
                </StyledText>
            </StyledNavItem>
          ))
        })}
      </StyledNavList>
      <NavbarButton className='nav-tweet-button' onClick={handleOpenTweetModal}>推文</NavbarButton>
    </StyledNavbar>
  );
}

export default Navbar;


