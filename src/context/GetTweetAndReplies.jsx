import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTweets, getTweetById } from '../api/tweets';
import { createReply, getRepliesById } from '../api/replies';

const GetTheTweetContext = createContext(() => {});

export const useGetTheTweet = () => useContext(GetTheTweetContext);

export const GetTheTweetProvider = ({ children }) => {
  const navigate = useNavigate();

  const [selectedTweetItem, setSelectedTweetItem] = useState({
    id: 14,
    userId: 14,
    description:
      'Quibusdam quod quo beatae totam ut sit ducimus sunt. Minima eos deleniti quo a quia. Et repellendus explicabo inventore voluptas vel dignissimos pariatur. Atque aut laboriosam rem deleniti aperiam aut voluptatem vero vitae.',
    createdAt: '2023-06-10 09:39:53',
    updatedAt: '2023-06-10 09:39:53',
    diffCreatedAt: 'a few seconds ago',
    replyCount: 5,
    likeCount: 0,
    User: {
      id: 14,
      name: 'user1',
      email: 'user1@example.com',
      account: 'user1',
      avatar: 'https://loremflickr.com/320/240/man/?random=0.23200002093710648',
      cover: 'https://loremflickr.com/1440/480/city/?random=14.084527578970008',
    },
  });
  const [selectedReplyItem, setSelectedReplyItem] = useState({
    id: 14,
    userId: 14,
    description:
      'Quibusdam quod quo beatae totam ut sit ducimus sunt. Minima eos deleniti quo a quia. Et repellendus explicabo inventore voluptas vel dignissimos pariatur. Atque aut laboriosam rem deleniti aperiam aut voluptatem vero vitae.',
    createdAt: '2023-06-10 09:39:53',
    updatedAt: '2023-06-10 09:39:53',
    diffCreatedAt: 'a few seconds ago',
    replyCount: 5,
    likeCount: 0,
    User: {
      id: 14,
      name: 'user1',
      email: 'user1@example.com',
      account: 'user1',
      avatar: 'https://loremflickr.com/320/240/man/?random=0.23200002093710648',
      cover: 'https://loremflickr.com/1440/480/city/?random=14.084527578970008',
    },
  });
  const [isTweetLoading, setIsTweetLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [repliesById, setRepliesById] = useState([]);
  const [replyInputValue, setReplyInputValue] = useState('');
  const [isReplyLoading, SetIsReplyLoading] = useState(false);
  const [updatedTweets, setUpdatedTweets] = useState([])
  const [updatedSelected, setUpdatedSelected] = useState(null)

  const handleTweetContentClick = async (id) => {
    setIsTweetLoading(true);
    try {
      const tweet = await getTweetById(id);
      setSelectedTweetItem(tweet);
      setIsTweetLoading(false);
      navigate(`/tweets/${id}`);
    } catch (error) {
      console.error(error);
      setIsTweetLoading(false);
    }
  };

  const handleReplyIconClickedAtHome = async (id) => {
    setIsModalLoading(true);
    try {
      const tweet = await getTweetById(id);
      setSelectedReplyItem(tweet);
      setIsModalLoading(false);
      navigate(`/tweets/${id}/reply`);
    } catch (error) {
      console.error(error);
      setIsModalLoading(false);
    }
  };

  const handleReplyIconClicked = async (id) => {
    setIsModalLoading(true);
    try {
      const tweet = await getTweetById(id);
      setSelectedReplyItem(tweet);
      setIsModalLoading(false);
      navigate(`/tweets/${id}`);
    } catch (error) {
      console.error(error);
      setIsModalLoading(false);
    }
  };

  const handleReplyInputChange = (value) => {
    setReplyInputValue(value);
  };

  const handleClickReplyInput = async () => {
    if (replyInputValue.length === 0) {
      return;
    }
    try {
      await createReply(selectedReplyItem.id, {
        comment: replyInputValue,
      });
      const tweets = await getTweets()
      setUpdatedTweets(tweets)
      const tweet = await getTweetById(selectedReplyItem.id)
      setUpdatedSelected(tweet)
      const replies = await getRepliesById(selectedReplyItem.id);
      setRepliesById(replies);
      navigate(`tweets/${selectedReplyItem.id}`)
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
    <GetTheTweetContext.Provider
      value={{
        handleTweetContentClick,
        handleReplyIconClicked,
        handleReplyIconClickedAtHome,
        selectedTweetItem,
        selectedReplyItem,
        isTweetLoading,
        isModalLoading,
        handleReplyInputChange,
        handleClickReplyInput,
        replyInputValue,
        repliesById,
        isReplyLoading,
        updatedTweets, updatedSelected
      }}
    >
      {children}
    </GetTheTweetContext.Provider>
  );
};