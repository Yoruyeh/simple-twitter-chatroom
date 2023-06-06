import styled from 'styled-components';
import { InputButton } from './common/button.styled'

const StyledInputContainer = styled.div`
  border: none;
  border-top: 1px solid #e5e5e5;
  border-bottom: 10px solid #e5e5e5;
  font-family: 'Noto Sans TC', sans-serif; 
  width: 640px;
  height: 136px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const StyledInput = styled.div`
  width: 470px;
  height: 100px;
  margin-right: 10px;
  text-align: start;
  #tweet-input {
    outline: none;
    resize: none;
    border: none;
    width: 100%;
    height: 100%;
    color: #171725;
    line-height: 26px;
  }
  ::placeholder {
    font-weight: bold;
    color: #6c757d;
  }
  :focus::placeholder {
      color: transparent;
    }
  ::-webkit-scrollbar { 
    width: 2px; 
    background-color: transparent;
  }
`
const StyledAvatar = styled.div`
  background-image: url(${(props) => props.image ? props.image : ""});
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 16px;
  left: 24px;
`

const StyledCustomButton = styled(InputButton)`
  position: absolute;
  bottom: 16px;
  right: 24px;
`

const TweetInput = () => {
  return (
    <StyledInputContainer>
      <StyledAvatar image={"https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=601&q=80"} />
      <StyledInput>
        <textarea id="tweet-input" placeholder="有什麼新鮮事?" />
      </StyledInput>
      <StyledCustomButton>推文</StyledCustomButton>
    </StyledInputContainer>
  )
}

export default TweetInput