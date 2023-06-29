import { createContext, useContext, useState, useEffect } from 'react'
import { socket } from '../socket';
import { useGetUserTweets } from './GetUserTweets';

const SocketContext = createContext(() => {});

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const { currentMemberInfo, userInfo } = useGetUserTweets()
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [joinedUsers, setJoinedUsers] = useState([])
  const [myMessages, setMyMessages] = useState([]);
  const [otherMessages, setOtherMessages] = useState([]);
  const [leftUsers, setLeftUsers] = useState([])
  const [privateMyMsg, setPrivateMyMsg] = useState([])
  const [privateOtherMsg, setPrivateOtherMsg] = useState([])

  useEffect(() => {
      function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessageEvent(messageData) {
      if (messageData.sender.id === currentMemberInfo.id) {
        setMyMessages(previous => [...previous, messageData])
      } else {
        setOtherMessages(previous => [...previous, messageData])
      }
    }

    function onPrivateMessageEvent(messageData) {
      if (messageData.sender.id === currentMemberInfo.id) {
        setPrivateMyMsg(previous => [...previous, messageData])
      } 
      if (messageData.sender.id === userInfo.id) {
        setPrivateOtherMsg(previous => [...previous, messageData])
      }
    }

    function onJoinedEvent(userList) {
      setJoinedUsers(userList); // 接收到伺服器端的joinedUsers的data陣列
    }

    function onLeftEvent(userList) {
      setLeftUsers(userList);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('user-joined', onJoinedEvent);
    socket.on('create-message', onMessageEvent);
    socket.on('privateMessage', onPrivateMessageEvent);
    socket.on('user-left', onLeftEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('user-joined', onJoinedEvent);
      socket.off('create-message', onMessageEvent);
      socket.off('privateMessage', onPrivateMessageEvent);
      socket.off('user-left', onLeftEvent);
    };
  }, [currentMemberInfo, userInfo]);


  return (
    <SocketContext.Provider 
    value={{isConnected, setIsConnected, myMessages, joinedUsers, leftUsers, otherMessages, privateMyMsg, privateOtherMsg}}>
      {children}
    </SocketContext.Provider>
  );
};
