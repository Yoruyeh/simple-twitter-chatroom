import { ChatRoomLayout } from "../layout/ChatroomLayout";
import Navbar from '../components/chatroom/Navbar'
import UserMessage from "../components/chatroom/UserMessage";
import ChatRoom from "../components/chatroom/ChatRoom";

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