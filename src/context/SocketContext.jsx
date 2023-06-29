import { createContext, useContext, useState, useEffect } from 'react'
import { socket } from '../socket';
import { useGetUserTweets } from './GetUserTweets';

const SocketContext = createContext(() => {});

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const { currentMemberInfo, userInfo } = useGetUserTweets()
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [joinedUsers, setJoinedUsers] = useState([])
  const [messages, setMessages] = useState([]);
  const [leftUsers, setLeftUsers] = useState([])
  const [privateMessage, setPrivateMessage] = useState([])

  useEffect(() => {
      function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessageEvent(messageData) {
      // 接收到伺服器端的messageData，包含message和sender data
      setMessages(previous => [...previous, messageData])
    }

    function onPrivateMessageEvent(messageData) {
      // 接收到伺服器端的messageData，包含message和sender data
      setPrivateMessage(previous => [...previous, messageData])
    }

    function onJoinedEvent(userList) {
      setJoinedUsers(userList); // 接收到伺服器端的joinedUsers的data陣列
    }

    function onLeftEvent(userList) {
      setLeftUsers(userList); // 接收到伺服器端的leftUsers的data陣列
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('user-joined', onJoinedEvent);
    socket.on('create-message', onMessageEvent);
    socket.on('private-message', onPrivateMessageEvent);
    socket.on('user-left', onLeftEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('user-joined', onJoinedEvent);
      socket.off('create-message', onMessageEvent);
      socket.off('private-message', onPrivateMessageEvent);
      socket.off('user-left', onLeftEvent);
    };
  }, [currentMemberInfo, userInfo]);


  return (
    <SocketContext.Provider 
    value={{isConnected, setIsConnected, messages, joinedUsers, leftUsers, privateMessage}}>
      {children}
    </SocketContext.Provider>
  );
};
