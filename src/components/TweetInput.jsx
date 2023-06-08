import styled from 'styled-components';

const StyledInputContainer = styled.div`
  border: none;
  font-family: 'Noto Sans TC', sans-serif; 
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const StyledInput = styled.div`
  width: 100%;
  height: 100%;
  text-align: start;
  .tweet-input {
    outline: none;
    resize: none;
    border: none;
    width: 100%;
    height: 100%;
    padding: 28px 24px 10px 83px;
    color: var(--dark-100);
    line-height: 26px;
  }
  .modal-reply-input {
    font-size: 18px;
    &::placeholder {
      font-weigt: medium;
    }
  }
  ::placeholder {
    font-weight: bold;
    color: var(--secondary);
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

const TweetInput = ({ className, placeholder }) => {
  return (<>
    <StyledInputContainer>
      <StyledAvatar image={"https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=601&q=80"} />
      <StyledInput>
        <textarea className={`tweet-input ${className}`} placeholder={placeholder} />
      </StyledInput>
    </StyledInputContainer>
    </>
  )
}

export default TweetInput