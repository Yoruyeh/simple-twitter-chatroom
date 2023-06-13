import { createContext, useContext, useState, useEffect } from 'react';
import { getRepliesById, createReply } from '../api/replies';
import { useGetTheTweet } from './GetTheTweet';
import { useNavigate } from 'react-router-dom'
import { getTweets } from '../api/tweets';

const CreateReplyContext = createContext(() => {});

export const useCreateReply = () => useContext(CreateReplyContext);

export const CreateReplyProvider = ({ children }) => {
  const [repliesById, setRepliesById] = useState([]);
  const [replyInputValue, setReplyInputValue] = useState('');
  const { selectedTweetItem, isTweetLoading } = useGetTheTweet();
  const [isReplyLoading, SetIsReplyLoading] = useState(false);
  const [updatedTweets, setUpdatedTweets] = useState([])
  const navigate = useNavigate()

  const handleReplyInputChange = (value) => {
    setReplyInputValue(value);
  };

  const handleClickReplyInput = async () => {
    if (replyInputValue.length === 0) {
      return;
    }
    try {
      await createReply(selectedTweetItem.id, {
        comment: replyInputValue,
      });
      const result = await getTweets()
      setUpdatedTweets(result)
      const replies = await getRepliesById(selectedTweetItem.id);
      setRepliesById(replies);
      navigate(`tweets/${selectedTweetItem.id}`)
    } catch (error) {
      console.error(error);
    }
    setReplyInputValue('');
  };

  useEffect(() => {
    if (!isTweetLoading) {
      SetIsReplyLoading(true);
      const getRepliesByIdAsync = async () => {
        try {
          const replies = await getRepliesById(selectedTweetItem.id);
          setRepliesById(replies);
          SetIsReplyLoading(false);
        } catch (error) {
          console.error(error);
          SetIsReplyLoading(false);
        }
      };
      getRepliesByIdAsync();
    }
  }, [isTweetLoading, selectedTweetItem]);

  return (
    <CreateReplyContext.Provider
      value={{
        repliesById,
        replyInputValue,
        handleReplyInputChange,
        handleClickReplyInput,
        isReplyLoading,
        updatedTweets
      }}
    >
      {children}
    </CreateReplyContext.Provider>
  );
};