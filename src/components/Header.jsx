import styled from 'styled-components';
import { OutlinedBack } from '../assets/icons';
import { useNavigate } from 'react-router-dom'
import { useGetUserTweets } from '../context/GetUserTweets';

const StyledMainHeader = styled.header`
  font-family: 'Noto Sans TC';
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--dark-100);
  border-bottom: 1px solid var(--gray);
  position: relative;

  & h4 {
    margin-left: 24px;
  }
`;

const StyledReplyHeader = styled(StyledMainHeader)`
  & h4 {
    margin-left: 64px;
  }
  .header-icon-back {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 24px;
    &:hover {
      cursor: pointer;
    }
  }
`

const StyledUserHeader = styled(StyledReplyHeader)`
  & h5 {
    margin-left: 64px;
    margin-bottom: 2px;
  }
`

const StyledText = styled.div`
  font-size: 13px;
  color: var(--secondary);
  margin-left: 64px;
`;

const MainHeader = () => {
  return (
  <>
    <StyledMainHeader>
      <h4>首頁</h4>
    </StyledMainHeader>
  </>
  );
};

const SettingHeader = () => {
  return (
  <>
    <StyledMainHeader>
      <h4>帳戶設定</h4>
    </StyledMainHeader>
  </>
  );
};

const ReplyHeader = () => {
  const navigate = useNavigate()
  return (
  <>
    <StyledReplyHeader>
      <OutlinedBack className='header-icon-back' 
      onClick={() => navigate(-1)}/>
      <h4>推文</h4>
    </StyledReplyHeader>
  </>
  );
};

const UserHeader = () => {
  const navigate = useNavigate()
  const { currentMemberInfo } = useGetUserTweets()

  return (
  <>
    <StyledUserHeader>
      <OutlinedBack className='header-icon-back' 
      onClick={() => navigate(-1)}/>
      <h5>{currentMemberInfo.name}</h5>
      <StyledText>{currentMemberInfo.tweetAmount} 推文</StyledText>
    </StyledUserHeader>
  </>
  );
};

const OtherUserHeader = ({ userInfo }) => {
  const navigate = useNavigate()

  return (
  <>
    <StyledUserHeader>
        <OutlinedBack className='header-icon-back' 
      onClick={() => navigate(-1)}/>
      <h5>{userInfo.name}</h5>
      <StyledText>{userInfo.tweetAmount} 推文</StyledText>
    </StyledUserHeader>
  </>
  );
};

export { MainHeader, SettingHeader, ReplyHeader, UserHeader, OtherUserHeader};
