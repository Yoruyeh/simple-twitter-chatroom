import { NotificationLayout } from "../layout/ChatroomLayout";
import Navbar from '../components/chatroom/Navbar'
import Notification from "../components/chatroom/Notification";
import Followingship from "../components/chatroom/Followingship";

const NotificationPage = () => {
  return (
    <NotificationLayout 
    left={<Navbar />}
    center={<Notification />}
    right={<Followingship />}
    />
  )
}

export default NotificationPage