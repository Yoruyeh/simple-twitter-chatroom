import styled, { css } from 'styled-components'

const StyledAuthButton = styled.button`
  border-radius: 50px;
  background-color: #ff6600;
  border: none;
  color: white;
  width: 356px;
  height: 46px;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 20px;
  font-weight: regular;
  padding: 8px 0;
  text-align: center;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }
`

const StyledNavbarButton = styled(StyledAuthButton)`
  width: 178px;
`

const StyledSaveButton = styled(StyledAuthButton)`
  width: 88px;
  heigth: 64px;
`

const StyledFollowButton = styled(StyledAuthButton)`
  width: 96px;
  height: 40px;
  font-size: 16px;
  ${({ isFollowed }) =>
    !isFollowed &&
    css`
      background-color: #ffffff;
      color: #ff6600;
      border: 1px solid #ff6600;
      width: 64px;
      height: 40px;
    `}
`

const StyledInputButton = styled(StyledAuthButton)`
  width: 64px;
  heigth: 40px;
  font-size: 16px;
`
// square button
const StyledSquareButton = styled.button`
  background-color: #fff;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  padding: 8px 16px;
  color: var(--main);
  border: 1px solid var(--main);
  border-radius: 4px;

  &:hover {
    background-color: var(--main);
    color: var(--dark-0);
  }

  // Filled
  ${({ filled }) =>
    filled &&
    css`
      background-color: var(--main);
      color: var(--dark-0);
    `}
  // Large
  ${({ large }) =>
    large &&
    css`
      font-size: 20px;
      padding: 8px 24px;
    `}
`
// pill button
const StyledPillButton = styled.button`
  background-color: #fff;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  padding: 8px 16px;
  color: var(--main);
  border: 1px solid var(--main);
  border-radius: 50px;

  // Filled
  ${({ filled }) =>
    filled &&
    css`
      background-color: var(--main);
      color: var(--dark-0);
    `}
  // Large
  ${({ large }) =>
    large &&
    css`
      font-size: 20px;
      padding: 8px 24px;
    `}
  // small
  ${({ small }) =>
    small &&
    css`
      padding: 4px 8px;
    `}
`

export {
  StyledAuthButton as AuthButton,
  StyledNavbarButton as NavbarButton,
  StyledSaveButton as SaveButton,
  StyledFollowButton as FollowButton,
  StyledInputButton as InputButton,
  StyledSquareButton as SquareButton,
  StyledPillButton as PillButton,
}
