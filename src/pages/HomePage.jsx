import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import TweetInput from '../components/TweetInput'
import TweetCollection from '../components/TweetCollection'
import { InputButton } from '../components/common/button.styled'
import { PopularFollower, PopularFollowerItem }from '../components/PopularFollower'


const StyledHomePageContainer = styled.div`
  .row {
    margin: 0 130px;
  }
  .navbar-container {
    border-right: 1px solid var(--gray1);
  }
  .main-container {
    padding: 0;
  }
  .tweet-collection {
    overflow-y: scroll;
    height: calc(100vh - 220px);
    &::-webkit-scrollbar { 
    width: 0px; 
    background-color: transparent;
  }
  }
  .popular-follower-container {
    border-left: 1px solid var(--gray1);
  }
  .tweet-button {
    text-align: end;
    border-bottom: 10px solid var(--gray1);
    padding: 16px;
  }
  .tweet-item-wrapper, .header {
    border-bottom: 1px solid var(--gray1);
  }
`

const HomePage = () => {
  return (
    <StyledHomePageContainer>
    <div className="row">
    <div className="col-3 navbar-container">
      <Navbar />
    </div>
    <div className="col-6 main-container">
        <div className="header">
          <Header />
          </div>
        <div className="tweet-input">
          <TweetInput placeholder={"發生什麼新鮮事？"} />
        </div>
        <div className="tweet-button">
          <InputButton>推文</InputButton>
        </div>
        <div className="tweet-collection">
          <TweetCollection />
        </div>
    </div>
    <div className="col-3 popular-follower-container">
      <PopularFollower>
        <PopularFollowerItem />
        <PopularFollowerItem />
        <PopularFollowerItem />
      </PopularFollower>
    </div>
    </div>
    </StyledHomePageContainer>
  )
}

export default HomePage