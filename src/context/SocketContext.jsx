import { createContext, useContext, useState, useEffect } from 'react'
// import { useAuth } from './AuthContext'
import { socket } from '../socket';
import { useGetUserTweets } from './GetUserTweets';
// import { getLikes, createLike, createUnLike } from '../api/like'
// import { getTweets, getTweetById } from '../api/tweets';
// import { useGetTweets } from './GetTweets';
// import { useGetUserTweets } from './GetUserTweets';
// import { getUserTweets } from '../api/other.users';
// import { useGetSelectedTweet } from './GetSelectedTweet';
// import { useLocation } from 'react-router-dom';

const SocketContext = createContext(() => {});

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const { currentMemberInfo } = useGetUserTweets()
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [myMessages, setMyMessages] = useState([]);
  const [otherMessages, setOtherMessages] = useState([]);
  const [joinedUsers, setJoinedUsers] = useState([])
  const [leftUsers, setLeftUsers] = useState([])

  useEffect(() => {
      function onConnect() {
      console.log('connected')
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log('disconnected')
      setIsConnected(false);
    }

    function onMessageEvent(messageData) {
      if (messageData.sender.userId === currentMemberInfo.id) {
        setMyMessages(previous => [...previous, messageData])
      } else {
        setOtherMessages(previous => [...previous, messageData])
      }
    }

    function onJoinedEvent(userList) {
      setJoinedUsers(userList);
    }

    function onLeftEvent(userList) {
      setLeftUsers(userList);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('create-message', onMessageEvent);
    socket.on('user-joined', onJoinedEvent);
    socket.on('user-left', onLeftEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('create-message', onMessageEvent);
      socket.off('user-joined', onJoinedEvent);
      socket.off('user-left', onLeftEvent);
    };
  }, [currentMemberInfo]);


  return (
    <SocketContext.Provider 
    value={{isConnected, setIsConnected, myMessages, joinedUsers, leftUsers, otherMessages}}>
      {children}
    </SocketContext.Provider>
  );
};
