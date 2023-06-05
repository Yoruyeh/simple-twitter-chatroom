import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  border-radius: 50px;
  background-color: #ff6600;
  border: none;
  color: white;
  width: ${({ width }) => (width ? width : '356px')};
  height: ${({ height }) => (height ? height : '46px')};
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: bold;
  padding: 8px 24px;
  margin: 8px 0;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }
  ${({ isUnfollow }) =>
    isUnfollow &&
    css`
      background-color: #ffffff;
      color: #ff6600;
      border: 1px solid #ff6600;
      border-radius: 50px;
      width: 64px;
      height: 40px;
      font-size: 16px;
      font-weight: normal;
      padding: 8px 16px;
    `}
`;

export default StyledButton;
