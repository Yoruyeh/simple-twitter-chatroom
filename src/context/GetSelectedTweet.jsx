import { createContext, useContext, useState } from 'react'
import { getTweets, getTweetById } from '../api/tweets';
import { getRepliesById, createReply } from '../api/replies';
import { useNavigate } from 'react-router-dom';
import { useGetTweets } from './GetTweets';
import { useAuth } from './AuthContext';

const GetSelectedTweetContext = createContext(() => {});

export const useGetSelectedTweet = () => useContext(GetSelectedTweetContext);

export const GetSelectedTweetProvider = ({ children }) => {
  const navigate = useNavigate()
  const { currentMember } = useAuth()
  const { setTweets } = useGetTweets()
  // 點進內容渲染reply page
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
  })
  const [replies, setReplies] = useState([])
  const [isReplyPageLoading, setIsReplyPageLoading] = useState(false)
  // 點icon渲然該推文內容及input modal
  const [isModalLoading, setIsModalLoading] = useState(false)
  // 回覆的input控制
  const [replyInputValue, setReplyInputValue] = useState('')

  const handleTweetContentClick = async (id) => {
    setIsReplyPageLoading(true);
    try {
      const tweet = await getTweetById(id)
      setSelectedReplyItem(tweet)
      const replysById = await getRepliesById(id)
      setReplies(replysById)
      setIsReplyPageLoading(false);
      navigate(`/tweets/${id}`);
    } catch (error) {
      console.error(error);
      setIsReplyPageLoading(false);
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

  const handleReplyIconClickedAtUser = async (id) => {
    setIsModalLoading(true);
    try {
      const tweet = await getTweetById(id);
      setSelectedReplyItem(tweet);
      setIsModalLoading(false);
      navigate(`/${currentMember.id}/tweets/${id}/reply`);
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
      navigate(`/replies/tweets/${id}/reply`);
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
      setTweets(tweets)
      const tweet = await getTweetById(selectedReplyItem.id)
      setSelectedReplyItem(tweet)
      const replies = await getRepliesById(selectedReplyItem.id);
      setReplies(replies);
      navigate(`/tweets/${selectedReplyItem.id}`)
    } catch (error) {
      console.error(error);
    }
    setReplyInputValue('');
  };


  return (
    <GetSelectedTweetContext.Provider 
    value={{isReplyPageLoading, handleTweetContentClick, 
    handleReplyIconClickedAtHome, selectedReplyItem, setSelectedReplyItem, isModalLoading, replies, handleReplyIconClicked, handleReplyInputChange, handleClickReplyInput, replyInputValue, handleReplyIconClickedAtUser}}>
      {children}
    </GetSelectedTweetContext.Provider>
  );
}