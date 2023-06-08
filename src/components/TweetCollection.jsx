import { TweetItem, TweetItemIcon } from "./TweetItem";

const TweetCollection = () => {
  return (
  <>
  <div className="tweet-item-wrapper">
    <TweetItem />
    <TweetItemIcon />
  </div>
  <div className="tweet-item-wrapper">
    <TweetItem />
    <TweetItemIcon />
    </div>
    <div className="tweet-item-wrapper">
    <TweetItem />
    <TweetItemIcon />
    </div>
    <div className="tweet-item-wrapper">
    <TweetItem />
    <TweetItemIcon />
    </div>
    <div className="tweet-item-wrapper">
    <TweetItem />
    <TweetItemIcon />
    </div>
    <div className="tweet-item-wrapper">
    <TweetItem />
    <TweetItemIcon />
    </div>
  </>
  );
};

export default TweetCollection;
