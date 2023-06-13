import ReplyItem from './ReplyItem'

const ReplyCollection = ({ repliesById }) => {


  return (
    <>
      {repliesById.map((reply) => {
        return (
          <div className="reply-item-wrapper" key={reply.replyId}>
            <ReplyItem reply={reply}/>
          </div>
        )
      })}
    </>
  );
};

export default ReplyCollection;
