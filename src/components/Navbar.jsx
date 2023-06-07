import styled from 'styled-components';
import {
  Logo,
  OutlinedHome,
  OutlinedUser,
  OutlinedCog,
  OutlinedLogout,
} from '../assets/icons';
import { NavbarButton } from "./common/button.styled"

const StyledNavbar = styled.nav`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const StyledNavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const StyledNavItem = styled.li`
  color: #44444f;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin: 10px 6px;
  min-width: 178px;

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

const Navbar = () => {
  return (
    <StyledNavbar>
      <StyledLogo>
        <Logo/>
      </StyledLogo>
      <StyledNavList>
        <StyledNavItem>
          <StyledLogo>
            <OutlinedHome/>
          </StyledLogo>
          <StyledText>首頁</StyledText>
          </StyledNavItem>
        <StyledNavItem>
          <StyledLogo>
            <OutlinedUser />
            </StyledLogo>
          <StyledText>個人資料</StyledText>
          </StyledNavItem>
        <StyledNavItem>
          <StyledLogo>
            <OutlinedCog />
            </StyledLogo>
            <StyledText>設定</StyledText>
          </StyledNavItem>
          <StyledNavItem>
          <NavbarButton>
            推文
          </NavbarButton>
          </StyledNavItem>
      <StyledNavItem>
        <StyledLogo>
          <OutlinedLogout />
          </StyledLogo>
          <StyledText>登出</StyledText>
        </StyledNavItem>
        </StyledNavList>
    </StyledNavbar>
  );
};

export default Navbar;


