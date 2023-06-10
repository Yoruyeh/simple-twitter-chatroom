import { createContext, useState, useContext } from 'react'
import { getTweetById } from '../api/tweets';

const GetTheTweetContext = createContext(null);

export const useGetTheTweet = () => useContext(GetTheTweetContext);

export const GetTheTweetProvider = ({ children }) => {
  const [selected, setSelected] = useState(null)

   const handleClick = async (id) => {
    try {
      const result = await getTweetById(id);
      setSelected(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GetTheTweetContext.Provider value={{selected, handleClick}}>
      {children}
    </GetTheTweetContext.Provider>
  );
};