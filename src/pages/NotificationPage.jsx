import { NotificationLayout } from "../layout/ChatroomLayout";
import Navbar from '../components/chatroom/Navbar'

const NotificationPage = () => {
  return (
    <NotificationLayout left={<Navbar />}/>
  )
}

export default NotificationPage