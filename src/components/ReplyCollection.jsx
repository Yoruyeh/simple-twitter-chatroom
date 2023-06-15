import ReplyItem from './ReplyItem'

const ReplyCollection = ({ replies }) => {
  return (
    <>
      {replies.map((reply) => {
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
