import { TweetItem, TweetItemIcon } from "./TweetItem";

const TweetCollection = ({ tweets, handleOpenReplyModal }) => {

  return (
    <div>
      {tweets.map((tweet) => (
          <div className="tweet-item-wrapper" key={tweet.id}>
            <TweetItem tweet={tweet}/>
            <TweetItemIcon tweet={tweet} handleOpenReplyModal={handleOpenReplyModal}/>
          </div>
        ))
      }
    </div>
  );
};


export default TweetCollection;


// import { TweetItem, TweetItemIcon } from "./TweetItem";

// const TweetCollection = ({ tweets, handleOpenReplyModal, updatedTweets }) => {

//   return (
//     <div>
//       {updatedTweets.length > 0 ? (
//         updatedTweets.map((tweet) => (
//           <div className="tweet-item-wrapper" key={tweet.id}>
//             <TweetItem tweet={tweet}/>
//             <TweetItemIcon tweet={tweet} handleOpenReplyModal={handleOpenReplyModal}/>
//           </div>
//         ))
//       ) : (
//         tweets.map((tweet) => (
//           <div className="tweet-item-wrapper" key={tweet.id}>
//             <TweetItem tweet={tweet}/>
//             <TweetItemIcon tweet={tweet} handleOpenReplyModal={handleOpenReplyModal}/>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };


// export default TweetCollection;

