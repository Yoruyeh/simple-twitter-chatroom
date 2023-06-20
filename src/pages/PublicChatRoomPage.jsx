import { ChatRoomLayout } from "../layout/ChatroomLayout";
import Navbar from '../components/chatroom/Navbar/Navbar'
import UserMessage from "../components/chatroom/UserMessage/UserMessage";
import ChatRoom from "../components/chatroom/ChatRoom/ChatRoom";

const PublicChatRoomPage = () => {
  return (
    <ChatRoomLayout 
    left={<Navbar />}
    center={<UserMessage />}
    right={<ChatRoom />}
    />
  )
}

export default PublicChatRoomPage