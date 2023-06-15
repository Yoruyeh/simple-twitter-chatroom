import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-around;
  background-color: #f5f8fa;
  width: 100%;
  height: 54px;
  border-radius: 2px;

  span {
    position: absolute;
    bottom: -18px;
    color: var(--danger);
  &.edit-modal-name {
    margin: 80px auto 32px;
    width: 602px;
  }
  &.edit-modal-introduction {
    margin: 0 auto 16px;
    width: 602px;
    height: 147px;
  }
`
const StyledLabel = styled.label`
  font-size: 14px;
  color: #696974;
  text-align: start;
`

const StyledInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 2px solid #657786;
  height: 100%;
  background-color: #f5f8fa;

  &[disabled] {
    color: #696974;
    border-bottom: 2px solid #d5d5dc;
  }
  &:hover {
    border-bottom: 2px solid #50b5ff;
  }
  &:focus {
    border-bottom: 2px solid #50b5ff;
  }
  &::placeholder {
    color: #b5b5be;
    font-size: 16px;
  }
  // danger狀態
  ${({ status }) =>
    status === 'danger'
      ? `border-bottom: 2px solid var(--danger)`
      : `border-bottom: 2px solid var(--default)`};
`

const AuthInput = ({
  type,
  placeholder,
  label,
  onChange,
  status,
  errorText,
  value,
}) => {
  return (
    <>
      <StyledContainer>
        <StyledLabel>{label}</StyledLabel>
        <StyledInput
          // 捕捉 input值
          onChange={(event) => onChange(event)}
          type={type || 'text'}
          placeholder={placeholder}
          status={status}
          disabled={status === 'disabled'}
          value={value}
        />
        <span className='fontMinimal'>{errorText}</span>
      </StyledContainer>
    </>
  )
}

export default AuthInput
