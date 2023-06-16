import styled from 'styled-components';
import { NotiBgSuccess, NotiBgDanger, NotiBgWarning, NotiBgInfo, NotiIconSuccess, NotiIconDanger, NotiIconWarning, NotiIconInfo } from '../assets/icons';

const StyledAlertContainer = styled.div`
  width: 394px;
  height: 96px;
  border-radius: 8px;
  box-shadow: 
  0px 4px 16px 0px rgba(51, 51, 51, 0.08), 
  0px 4px 4px 0px rgba(51, 51, 51, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledAlertContent = styled.div`
  font-family: Roboto;
  font-weight: bold;
  font-size: 20px;
  margin-left: 24px;
`

const StyledAlertIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-right: 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    width: 53px;
    height: 53px;
    border-radius: 50%;
    background-color: var(--dark-0);
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .icon {
    position: absolute;
    z-index: 4;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const Alert = ({ alertType }) => {

  const renderText = (alertType) => {
    switch (alertType) {
      case 'success':
        return <p>推文發送成功</p>
      case 'warning':
        return <p>網路連線中斷</p>
      case 'error':
        return <p>Email已重複註冊</p>
        case 'info':
        return <p>收到新的推文</p>
      default:
        return <p>通知訊息</p>;
    }
  }
  const renderIcon = (alertType) => {
    switch (alertType) {
      case 'success':
        return (<>
        <NotiBgSuccess className="background"/>
        <NotiIconSuccess className="icon" />
        </>
        );
      case 'warning':
        return (<>
        <NotiBgWarning className="background"/>
        <NotiIconWarning className="icon" />
        </>
        );
      case 'error':
        return (<>
        <NotiBgDanger className="background"/>
        <NotiIconDanger className="icon" />
        </>
        );
        case 'info':
        return (<>
        <NotiBgInfo className="background"/>
        <NotiIconInfo className="icon" />
        </>
        );
      default:
        return null;
    }
  };


  return (
    <StyledAlertContainer>
      <StyledAlertContent>
        {renderText(alertType)}
      </StyledAlertContent>
      <StyledAlertIconWrapper>
        {renderIcon(alertType)}
      </StyledAlertIconWrapper>
  </StyledAlertContainer>
  )
}

export default Alert