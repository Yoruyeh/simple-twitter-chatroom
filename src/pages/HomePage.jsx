import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import TweetInput from '../components/TweetInput';
import TweetCollection from '../components/TweetCollection';
import { InputButton } from '../components/common/button.styled';
import {
  PopularFollower,
  PopularFollowerItem,
} from '../components/PopularFollower';
import { getTweets } from '../api/tweets';

const StyledHomePageContainer = styled.div`
  .row {
    margin: 0 130px;
    height: 100vh;
  }
  .navbar-container {
    border-right: 1px solid var(--gray1);
  }
  .main-container {
    padding: 0;
    overflow-y: scroll;
    height: 100vh;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: -1px 0px 0px 0px rgba(240, 240, 240, 1) inset,
        1px 0px 0px 0px rgba(232, 232, 232, 1) inset;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #c1c1c1;
      border: 1px solid (--gray1);
      border-radius: 8px;
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
  .tweet-item-wrapper,
  .header {
    border-bottom: 1px solid var(--gray1);
  }
`;

const HomePage = () => {
  const [tweets, setTweets] = useState([]);
  console.log(tweets);

  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getTweets();
        setTweets(tweets.map((tweet) => ({ ...tweet })));
      } catch (error) {
        console.error(error);
      }
    };
    getTweetsAsync();
  }, []);

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
            <TweetInput placeholder={'發生什麼新鮮事？'} />
          </div>
          <div className="tweet-button">
            <InputButton>推文</InputButton>
          </div>
          <div className="tweet-collection">
            <TweetCollection tweets={tweets} />
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
  );
};

export default HomePage;

