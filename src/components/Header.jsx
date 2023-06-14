import styled from 'styled-components';
import { OutlinedBack } from '../assets/icons';
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

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
      onClick={() => navigate('/home')}/>
      <h4>推文</h4>
    </StyledReplyHeader>
  </>
  );
};

const UserHeader = () => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const { currentMember } = useAuth()

  return (
  <>
    <StyledUserHeader>
      {pathname.includes('followers') || pathname.includes('followings') ? (
        <OutlinedBack className='header-icon-back' 
      onClick={() => navigate(`/${currentMember.id}`)}/>
      ) : (
        <OutlinedBack className='header-icon-back' 
      onClick={() => navigate('/home')}/>
      )}
      
      <h5>{currentMember.name}</h5>
      <StyledText>25 推文</StyledText>
    </StyledUserHeader>
  </>
  );
};

export { MainHeader, SettingHeader, ReplyHeader, UserHeader};
