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
import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';

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
  const { isConnected } = useSocketContext()

   useEffect(() => {
    // 點擊大頭照到用戶個人頁面，會儲存user資料再local Storage
    // 點擊小信封進入私人訊息頁面後，用它取得訊息receiver的用戶data
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
    setUserInfo(JSON.parse(storedUserInfo));
  }
  }, [setUserInfo]);

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