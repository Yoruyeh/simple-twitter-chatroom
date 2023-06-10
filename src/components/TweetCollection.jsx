import { TweetItem, TweetItemIcon } from "./TweetItem";

const TweetCollection = ({ tweets }) => {
  return (
  <div>
    {tweets.map((tweet) => {
      return (
        <div className="tweet-item-wrapper" key={tweet.id}>
        <TweetItem tweet={tweet}/>
        <TweetItemIcon tweet={tweet}/>
        </div>
      )
    })}
  </div>
  );
};

export default TweetCollection;
