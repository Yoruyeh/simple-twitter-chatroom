import { createContext, useContext, useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import { getTweets, createTweet } from '../api/tweets';

const CreateTweetContext = createContext(() => {});

export const useCreateTweet = () => useContext(CreateTweetContext);

export const CreateTweetProvider = ({ children }) => {
  // const navigate = useNavigate()
  const [tweets, setTweets] = useState([])
  const [tweetInputValue, setTweetInputValue] = useState('')
  
  const handleChange = (value) => {
    setTweetInputValue(value)
  }

  const handleAddTweet = async () => {
    if(tweetInputValue.length === 0) {
      return
    }

    try {
      const data = await createTweet({ 
        description: tweetInputValue 
      })
      console.log(data)
      setTweets((prevTweets) => {
      return [...prevTweets, data]
    })
    } catch (error) {
      console.error(error)
    }
  }
 
  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getTweets();
        setTweets(tweets);
      } catch (error) {
        console.error(error);
      }
    };
    getTweetsAsync();
  }, []);


  return (
    <CreateTweetContext.Provider 
    value={{tweets, handleChange, handleAddTweet, tweetInputValue}}>
      {children}
    </CreateTweetContext.Provider>
  );
};



// const handleChange = (value) => {
//     setInputValue(value)
//   }

//   const handleAddTodo = async () => {
//     if (inputValue.length === 0) {
//       return
//     }

//     try {
//       const data = await createTodo({
//       title: inputValue,
//       isDone: false,
//     });

//     setTodos((prevTodos) => {
//       return [...prevTodos, 
//       {
//         id: data.id,
//         title: data.title,
//         isDone: false,
//         isEdit: false,
//       },
//     ]
//     })

//     setInputValue('')

//     } catch(error) {
//       console.error(error)
//     }
//   }
