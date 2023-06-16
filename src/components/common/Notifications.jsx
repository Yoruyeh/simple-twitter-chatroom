import styled, { css } from 'styled-components'
import {
  NotiIconSuccess,
  NotiIconInfo,
  NotiIconWarning,
  NotiIconDanger,
} from '../../assets/icons'

const StyledContainer = styled.div`
  width: 394px;
  height: 96px;
  padding: 34px 24px;
  border-radius: 8px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  background: white;
`

const StyledTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`
const StyledIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 56px;
  height: 56px;

  // 根據 success 決定樣式
  ${(props) =>
    props.status === 'success' &&
    css`
      border: 1px solid var(--greenColor);
    `};

  // 根據 info 決定樣式
  ${(props) =>
    props.status === 'info' &&
    css`
      border: 1px solid var(--blueColor);
    `};

  // 根據 warning 決定樣式
  ${(props) =>
    props.status === 'warning' &&
    css`
      border: 1px solid var(--warning);
    `};

  // 根據 danger 決定樣式
  ${(props) =>
    props.status === 'danger' &&
    css`
      border: 1px solid var(--danger);
    `};
`

export default function Notification({ children, status }) {
  return (
    <StyledContainer className='d-flex justify-content-between align-items-center'>
      <StyledTitle>{children}</StyledTitle>
      {/* success icon*/}
      {status === 'success' && (
        <StyledIconWrapper status='success'>
          <NotiIconSuccess></NotiIconSuccess>
        </StyledIconWrapper>
      )}
      {/* info icon*/}
      {status === 'info' && (
        <StyledIconWrapper status='info'>
          <NotiIconInfo></NotiIconInfo>
        </StyledIconWrapper>
      )}
      {/* warning icon*/}
      {status === 'warning' && (
        <StyledIconWrapper status='warning'>
          <NotiIconWarning></NotiIconWarning>
        </StyledIconWrapper>
      )}
      {/* danger icon*/}
      {status === 'danger' && (
        <StyledIconWrapper status='danger'>
          <NotiIconDanger></NotiIconDanger>
        </StyledIconWrapper>
      )}
    </StyledContainer>
  )
}
