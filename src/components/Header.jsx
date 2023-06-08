import styled from 'styled-components';
// import { OutlinedBack } from '../assets/icons';

const StyledMainHeader = styled.header`
  font-family: 'Noto Sans TC';
  width: 100%;
  height: 75px;
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

// const StyledTweetHeader = styled(StyledMainHeader)`
//   & h4 {
//     margin-left: 64px;
//   }
//   .header-icon-back {
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     left: 24px;
//   }
// `

// const StyledUserHeader = styled(StyledTweetHeader)`
//   & h5 {
//     margin-left: 64px;
//     margin-bottom: 2px;
//   }
// `

// const StyledText = styled.div`
//   font-size: 13px;
//   color: var(--secondary);
//   margin-left: 64px;
// `;

const Header = () => {
  return (
  <>
    <StyledMainHeader>
      <h4>首頁</h4>
    </StyledMainHeader>
    {/* <StyledTweetHeader>
      <OutlinedBack className='header-icon-back'/>
      <h4>推文</h4>
    </StyledTweetHeader>
    <StyledUserHeader>
      <OutlinedBack className='header-icon-back'/>
      <h5>John Doe</h5>
      <StyledText>25 推文</StyledText>
    </StyledUserHeader> */}
  </>
  );
};

export default Header;
