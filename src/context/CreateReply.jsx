import { createContext, useContext, useState, useEffect } from 'react';
import { getRepliesById, createReply } from '../api/replies';
import { useGetTheTweet } from './GetTheTweet';

const CreateReplyContext = createContext(() => {});

export const useCreateReply = () => useContext(CreateReplyContext);

export const CreateReplyProvider = ({ children }) => {
  const [repliesById, setRepliesById] = useState([]);
  const [replyInputValue, setReplyInputValue] = useState('');
  const { selectedTweetItem, isTweetLoading } = useGetTheTweet();
  const [isReplyLoading, SetIsReplyLoading] = useState(false);

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
      const replies = await getRepliesById(selectedTweetItem.id);
      setRepliesById(replies);
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
      }}
    >
      {children}
    </CreateReplyContext.Provider>
  );
};