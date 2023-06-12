import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTweetById } from '../api/tweets';


const GetTheTweetContext = createContext(() => {});

export const useGetTheTweet = () => useContext(GetTheTweetContext);

export const GetTheTweetProvider = ({ children }) => {
  const navigate = useNavigate()
  // const [selectedId, setSelectedId] = useState(0)
  const [selectedItem, setSelectedItem] = useState({
    id: 14,
    userId: 14,
    description: "Quibusdam quod quo beatae totam ut sit ducimus sunt. Minima eos deleniti quo a quia. Et repellendus explicabo inventore voluptas vel dignissimos pariatur. Atque aut laboriosam rem deleniti aperiam aut voluptatem vero vitae.",
    createdAt: "2023-06-10 09:39:53",
    updatedAt: "2023-06-10 09:39:53",
    diffCreatedAt: "a few seconds ago",
    replyCount: 5,
    likeCount: 0,
    User: {
      id: 14,
      name: "user1",
      email: "user1@example.com",
      account: "user1",
      avatar: "https://loremflickr.com/320/240/man/?random=0.23200002093710648",
      cover: "https://loremflickr.com/1440/480/city/?random=14.084527578970008"
    }})
  
  const handleTweetContentClick = (id) => {
    navigate(`/tweets/${id}`)
  }

  const handleReplyIconClicked = async (id) => {
    try {
    const tweet = await getTweetById(id);
    setSelectedItem(tweet)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <GetTheTweetContext.Provider 
    value={{handleTweetContentClick, handleReplyIconClicked, selectedItem}}>
      {children}
    </GetTheTweetContext.Provider>
  );
};

    // navigate(`/tweets/${id}/reply`)