import { NotificationLayout } from "../layout/ChatroomLayout";
import Navbar from '../components/chatroom/Navbar/Navbar'
import Notification from "../components/chatroom/Notification/Notification";
import Followingship from "../components/chatroom/Followingship/Followingship";

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