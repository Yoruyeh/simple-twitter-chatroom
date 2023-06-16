import { TweetItem, TweetItemIcon } from "./TweetItem";

const TweetCollection = ({ tweets }) => {

  return (
    <div>
      {tweets && tweets.map((tweet) => (
          <div className="tweet-item-wrapper" key={tweet.id}>
            <TweetItem tweet={tweet}/>
            <TweetItemIcon tweet={tweet} />
          </div>
        ))
      }
    </div>
  );
};


export default TweetCollection;