import styled from 'styled-components';

const StyledReplyItemContainer = styled.div`
  font-family: 'Noto Sans TC', sans-serif;
  width: 100%;
  height: 100%;
  color: var(--dark-100);
  font-size: 16px;
  display: flex;
  flex-direction: column;
  position: relative;

  .reply-info {
    margin: 20px 30px 4px 82px;
  }

  .reply-info-username {
    font-weight: bold;
  }

  .reply-info-account,
  .reply-info-time {
    font-weight: regular;
    font-size: 14px;
    color: var(--secondary);
  }

  .reply-to {
    margin: 4px 30px 4px 82px;
    font-size: 14px;
    line-height: 22px;
  }

  .reply-to-username {
    color: var(--main);
  }

  .reply-content {
    margin: 4px 30px 16px 82px;
    line-height: 26px;
  }
`
const StyledAvatar = styled.div`
  background-image: url(${(props) => (props.image ? props.image : '')});
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 16px;
  left: 24px;
`;

const ReplyItem = () => {
  return (
    <StyledReplyItemContainer>
      <StyledAvatar image={"https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=601&q=80"} />
      <div className="reply-info">
        <span className="reply-info-username">Apple</span>
        <span className="reply-info-account"> @apple・</span>
        <span className="reply-info-time">1小時</span>
      </div>
      <div className="reply-to">
        回覆
        <span className="reply-to-username"> @Apple</span>
      </div>
      <div className="reply-content">
        Magni facilis cum quo accusantium quam incidunt facere hic. Architecto tempore et iure cumque odit possimus enim hic pariatur. 
        </div>
    </StyledReplyItemContainer>
  )
}

export default ReplyItem