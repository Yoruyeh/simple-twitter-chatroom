import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #f5f8fa;
  width: 100%;
  height: 54px;
  border-radius: 2px;
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
`

const AuthInput = ({ className, type, placeholder, label }) => {
  return (
    <StyledContainer className={className}>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput type={type || 'text'} placeholder={placeholder} />
    </StyledContainer>
  )
}

export default AuthInput
