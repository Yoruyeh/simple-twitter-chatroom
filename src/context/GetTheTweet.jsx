import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const GetTheTweetContext = createContext(null);

export const useGetTheTweet = () => useContext(GetTheTweetContext);

export const GetTheTweetProvider = ({ children }) => {
  const navigate = useNavigate()
  
  const handleTweetContentClick = (id) => {
    navigate(`/tweets/${id}`)
  }

  return (
    <GetTheTweetContext.Provider value={{handleTweetContentClick}}>
      {children}
    </GetTheTweetContext.Provider>
  );
};