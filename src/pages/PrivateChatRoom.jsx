import styled from 'styled-components';
import { ChatRoomLayout } from "../layout/ChatroomLayout";
import Navbar from '../components/chatroom/Navbar/Navbar'
import UserMessage from "../components/chatroom/UserMessage/UserMessage";
import PrivateChatRoom from "../components/chatroom/ChatRoom/PrivateChatRoom";
import { useGetTweets } from "../context/GetTweets";
import { useGetUserTweets } from '../context/GetUserTweets';
import { TweetModal } from "../components/Modal";
import { socket } from '../socket';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

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

const PrivateChatRoomPage = () => {
  const { isAuthenticated } = useAuth()
  const { currentMemberInfo, userInfo, setUserInfo } = useGetUserTweets()
  const { handleOpenTweetModal, openTweetModal } = useGetTweets()
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    if (isAuthenticated && !joined && !socket.connected) {
      socket.connect();
      socket.emit('privateUser-joined', { currentMemberInfo, userInfo })
      setJoined(true)
    } 
    if(!isAuthenticated && socket.connected) {
      socket.disconnect();
      setJoined(false)
    }
  }, [isAuthenticated, currentMemberInfo, joined, userInfo])

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
    setUserInfo(JSON.parse(storedUserInfo));
  }
  }, [setUserInfo]);

  return (
    <>
    <ChatRoomLayout 
    left={<Navbar handleOpenTweetModal={handleOpenTweetModal}/>}
    center={<UserMessage userInfo={userInfo}/>}
    right={<PrivateChatRoom userInfo={userInfo}/>}
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

export default PrivateChatRoomPage