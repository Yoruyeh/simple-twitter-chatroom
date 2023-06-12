import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const GetTheTweetContext = createContext(() => {});

export const useGetTheTweet = () => useContext(GetTheTweetContext);

export const GetTheTweetProvider = ({ children }) => {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(0)
  
  const handleTweetContentClick = (id) => {
    navigate(`/tweets/${id}`)
  }

  const handleReplyIconClicked = (id) => {
    setSelectedId(id)
  }

  return (
    <GetTheTweetContext.Provider 
    value={{handleTweetContentClick, handleReplyIconClicked, selectedId}}>
      {children}
    </GetTheTweetContext.Provider>
  );
};

    // navigate(`/tweets/${id}/reply`)