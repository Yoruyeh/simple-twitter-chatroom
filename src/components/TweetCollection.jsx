import { TweetItem, TweetItemIcon } from "./TweetItem";

const TweetCollection = ({ tweets }) => {
  return (
  <div>
    {tweets.map((tweet) => {
      return (
        <div className="tweet-item-wrapper">
        <TweetItem key={tweet.User.id} tweet={tweet} />
        <TweetItemIcon />
        </div>
      )
    })}
  </div>
  );
};

export default TweetCollection;
