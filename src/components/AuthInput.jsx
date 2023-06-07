import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #f5f8fa;
  width: 100%;
  height: 54px;
  border-radius: 2px;
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

const AuthInput = ({ type, placeholder, label }) => {
  return (
    <StyledContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput type={type || 'text'} placeholder={placeholder} />
    </StyledContainer>
  )
}

export default AuthInput
