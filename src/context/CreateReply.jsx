import { createContext, useContext, useState, useEffect } from 'react'
import { getRepliesById, createReply } from '../api/replies';

const CreateReplyContext = createContext(() => {});

export const useCreateReply = () => useContext(CreateReplyContext);

export const CreateReplyProvider = ({ children }) => {
  const [repliesById, setRepliesById] = useState([])
  const [replyInputValue, setReplyInputValue] = useState('')
  
  const handleReplyInputChange = (value) => {
    setReplyInputValue(value)
  }

  const handleClickReplyInput = async () => {
    if(replyInputValue.length === 0) {
      return
    }
    try {
      await createReply({ 
        comment: replyInputValue 
      })
      const replies = await getRepliesById();
      setRepliesById(replies)
    } catch (error) {
      console.error(error)
    }
    setReplyInputValue('')
  }
 
  useEffect(() => {
    const getRepliesByIdAsync = async () => {
      try {
        const replies = await getRepliesById();
        setRepliesById(replies);
      } catch (error) {
        console.error(error);
      }
    };
    getRepliesByIdAsync();
  }, []);


  return (
    <CreateReplyContext.Provider 
    value={{repliesById, handleReplyInputChange, handleClickReplyInput}}>
      {children}
    </CreateReplyContext.Provider>
  );
};
