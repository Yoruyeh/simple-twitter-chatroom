import { TweetItem, TweetItemIcon } from "./TweetItem";

const TweetCollection = ({ tweets, handleOpenReplyModal }) => {
  return (
  <div>
    {tweets && tweets.map((tweet) => {
      return (
        <div className="tweet-item-wrapper" key={tweet.id}>
        <TweetItem tweet={tweet}/>
        <TweetItemIcon tweet={tweet} handleOpenReplyModal={handleOpenReplyModal}/>
        </div>
      )
    })}
  </div>
  );
};

export default TweetCollection;
