import { ChatRoomLayout } from "../layout/ChatroomLayout";
import Navbar from '../components/chatroom/Navbar/Navbar'
import OnlineUsers from "../components/chatroom/UserMessage/OnlineUsers";
import ChatRoom from "../components/chatroom/ChatRoom/ChatRoom";

const PublicChatRoomPage = () => {
  return (
    <ChatRoomLayout 
    left={<Navbar />}
    center={<OnlineUsers />}
    right={<ChatRoom />}
    />
  )
}

export default PublicChatRoomPage