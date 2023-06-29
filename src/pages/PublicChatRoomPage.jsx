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
import { useEffect } from 'react';
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

  useEffect(() => {
    // 已登入、未連線的情況
    if (isAuthenticated && !isConnected) {
      socket.connect(); // 建立連線
      socket.emit('user-joined', currentMemberInfo) // 發出'user-joined'事件，傳入用戶資料
    } 
    // 未登入、已連線的情況
    if(!isAuthenticated && isConnected) {
      socket.disconnect(); // 讓登出用戶斷線
    }
  }, [isAuthenticated, currentMemberInfo, isConnected])
 
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