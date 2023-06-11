import { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'


const GetTheTweetContext = createContext(null);

export const useGetTheTweet = () => useContext(GetTheTweetContext);

export const GetTheTweetProvider = ({ children }) => {
  const navigate = useNavigate()
  
  const handleClick = (id) => {
    navigate(`/tweets/${id}`)
  }

  return (
    <GetTheTweetContext.Provider value={{handleClick}}>
      {children}
    </GetTheTweetContext.Provider>
  );
};