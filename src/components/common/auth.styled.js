import styled from 'styled-components';

const StyedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const StyledAuthInputContainer = styled.div`
  width: 356px;
  margin-top: 30px;
`;

const StyledButton = styled.button`
  border-radius: 50px;
  background-color: #ff6600;
  border: none;
  color: white;
  width: 356px;
  height: 46px;
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: bold;
  padding: 8px 24px;
  margin: 2rem 0;
  &:hover {
    cursor: pointer;
  }
`;

const StyledLinkText = styled.div`
  color: #0062ff;
  font-size: 16px;
  font-weight: 400;
  &:hover {
    cursor: pointer;
  }
`;

export {
  StyedContainer as AuthContainer,
  StyledAuthInputContainer as AuthInputContainer,
  StyledButton as AuthButton,
  StyledLinkText as AuthLinkText,
};