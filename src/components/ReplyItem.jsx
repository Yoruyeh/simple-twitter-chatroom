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

const ReplyItem = ({ reply }) => {
  return (
    <StyledReplyItemContainer>
      <StyledAvatar image={reply.replyerData.avatar} />
      <div className="reply-info">
        <span className="reply-info-username">{reply.replyerData.name}</span>
        <span className="reply-info-account"> @{reply.replyerData.account}・</span>
        <span className="reply-info-time">1小時</span>
      </div>
      <div className="reply-to">
        回覆
        <span className="reply-to-username"> @{reply.tweetData.tweetOwnerAccount}</span>
      </div>
      <div className="reply-content">
        {reply.comment} 
        </div>
    </StyledReplyItemContainer>
  )
}

export default ReplyItem