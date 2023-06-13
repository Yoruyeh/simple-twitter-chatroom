import ReplyItem from './ReplyItem'

const ReplyCollection = ({ repliesById }) => {


  return (
    <div>
      {repliesById.map((reply) => {
        return (
          <div className="reply-item-wrapper" key={reply.replyId}>
            <ReplyItem reply={reply}/>
          </div>
        )
      })}
    </div>
  );
};

export default ReplyCollection;
