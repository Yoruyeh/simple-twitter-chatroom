import ReplyItem from './ReplyItem'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getRepliesById } from '../api/replies';

const ReplyCollection = () => {
  const [replies, setReplies] = useState([])
  const paramsId = useParams().id

  useEffect(() => {
    const getTweetByIdAsync = async () => {
      try {
        const result = await getRepliesById(paramsId);
        console.log(result)
        setReplies(result);
      } catch (error) {
        console.error(error);
      }
    };
    getTweetByIdAsync();
}, [paramsId]);

if (setReplies === null) {
  return <div>Loading...</div>;
}

  return (
    <div>
      {replies.map((reply) => {
        return (
          <div className="reply-item-wrapper" key={reply.replyId}>
            <ReplyItem reply={reply}/>
          </div>
        )
      })}
    </div>
  );

  // return (
  //   <div>
  //     <div className="reply-item-wrapper" >
  //       <ReplyItem />
  //     </div>
  //   </div>
  // );
};

export default ReplyCollection;
