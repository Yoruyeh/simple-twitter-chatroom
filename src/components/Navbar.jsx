import styled from 'styled-components';
import { useState } from 'react';
import {
  Logo,
  OutlinedHome, FilledHome,
  OutlinedUser, FilledUser,
  OutlinedCog, FilledCog,
  OutlinedLogout
} from '../assets/icons';
import { NavbarButton } from "./common/button.styled"
import { NavLink } from 'react-router-dom'

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

  & a {
    text-decoration: none;
    display: flex;
    align-items: center;

    &:hover {
      color: var(--main);
      & svg > path {
        fill: var(--main);
      }
    &:visited {
      color: var(--dark-90);
    }
  }

    &.clicked {
      color: var(--main);
      & svg > path {
        fill: var(--main);
      }
      &:visited {
        color: var(--main);
      }
    }
  }

  &:last-child {
    position: absolute;
    bottom: 0;
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
    link: "/home", 
    isVisited: false,
    icons: {
      outlined: <OutlinedUser />,
      filled: <FilledUser />
    }
  },
  {
    id: "3",
    text: "設定",
    link: "/home", 
    isVisited: false,
    icons: {
      outlined: <OutlinedCog />,
      filled: <FilledCog />
    }
  },
  {
    id: "4",
    text: "登出",
    link: "/home", 
    isVisited: false,
    icons: {
      outlined: <OutlinedLogout />,
      filled: <OutlinedLogout />,
    }
  }
]

const Navbar = ({ handleOpenTweetModal }) => {
  const [navItems, setNavItems] = useState(DefaultNavItems)

  const handleClick = (id) => {
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
  }

  return (
    <StyledNavbar>
      <StyledLogo>
        <Logo />
      </StyledLogo>
      <StyledNavList>
        {navItems.map(item => {
          return (
            <StyledNavItem key={item.id} onClick={() => handleClick(item.id)} className={item.isVisited ? 'clicked' : ''}>
              <NavLink to={item.link}>
                <StyledLogo>
                  {item.isVisited ? (
                    item.icons.filled
                  ) : (
                    item.icons.outlined
                  )}
                </StyledLogo>
                <StyledText>{item.text}</StyledText>
              </NavLink>
            </StyledNavItem>
          )
        })}
        </StyledNavList>
        <NavbarButton className='nav-tweet-button' onClick={handleOpenTweetModal}>推文</NavbarButton>
    </StyledNavbar>
  );
};

export default Navbar;


