import styled from 'styled-components';

const StyedAuthContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledAuthInputContainer = styled.div`
  width: 356px;
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
  StyedAuthContainer as AuthContainer,
  StyledAuthInputContainer as AuthInputContainer,
  StyledLinkText as AuthLinkText,
};