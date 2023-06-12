import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const GetTheTweetContext = createContext(() => {});

export const useGetTheTweet = () => useContext(GetTheTweetContext);

export const GetTheTweetProvider = ({ children }) => {
  const navigate = useNavigate()
  
  const handleTweetContentClick = (id) => {
    navigate(`/tweets/${id}`)
  }

  const handleReplyIconClicked = (id) => {
    navigate(`/tweets/${id}/reply`)
  }

  return (
    <GetTheTweetContext.Provider 
    value={{handleTweetContentClick, handleReplyIconClicked}}>
      {children}
    </GetTheTweetContext.Provider>
  );
};