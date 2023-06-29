import styled from 'styled-components';
import { ChatRoomLayout } from "../layout/ChatroomLayout";
import Navbar from '../components/chatroom/Navbar/Navbar'
import OnlineUsers from "../components/chatroom/UserMessage/OnlineUsers";
import PublicChatRoom from "../components/chatroom/ChatRoom/PublicChatRoom";
import { useGetTweets } from "../context/GetTweets";
import { useGetUserTweets } from '../context/GetUserTweets';
import { TweetModal } from "../components/Modal";
import { useSocketContext } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { socket } from '../socket';


const StyledTweetModalContainer = styled.div`
  position: fixed;
  top: 56px;
  left: 50vw;
  transform: translateX(-50%);
  z-index: 1;

  &::before {
    content: '';
    position: fixed;
    top: -56px;
    left: -50vw;
    transform: translateX(300px);
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
`

const PublicChatRoomPage = () => {
  const { isAuthenticated } = useAuth()
  const { currentMemberInfo } = useGetUserTweets()
  const { handleOpenTweetModal, openTweetModal } = useGetTweets()
  const { isConnected } = useSocketContext()
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    if (isAuthenticated && !joined && !socket.connected) {
      socket.connect();
      socket.emit('user-joined', currentMemberInfo)
      setJoined(true)
    } 
    if(!isAuthenticated && socket.connected) {
      socket.disconnect();
      setJoined(false)
    }
    if(!joined && socket.connected) {
      socket.emit('user-joined', currentMemberInfo)
      setJoined(true)
    }
  }, [isAuthenticated, currentMemberInfo, joined])
 
  return (
    <>
    <ChatRoomLayout 
    left={<Navbar handleOpenTweetModal={handleOpenTweetModal}/>}
    center={<OnlineUsers isConnected={isConnected}/>}
    right={<PublicChatRoom isConnected={isConnected}/>}
    />
    {openTweetModal && (
      <StyledTweetModalContainer>
        <TweetModal
          placeholder={'有什麼新鮮事？'}
          handleOpenTweetModal={handleOpenTweetModal}
          currentMemberInfo={currentMemberInfo}
        />
      </StyledTweetModalContainer>
    )}
    </>
  )
}

export default PublicChatRoomPage