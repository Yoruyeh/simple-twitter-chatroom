import { useSocketContext } from '../../../context/SocketContext';
import styles from './online.user.module.scss'

const OnlineUsers = ({ isConnected }) => {
  const { joinedUsers } = useSocketContext()

  return (
  <div className={styles.container}>
  <header>
    <h4>上線使用者 ({joinedUsers.length})</h4>
  </header>
  <div className={styles.userWrapper} >
    {isConnected && joinedUsers && (
      joinedUsers.map((user) => {
        return (
        <div className={styles.userItem} key={user.userId}>
          <img src={user.userAvatar} alt="avatar" className={styles.avatar} />
          <h6 className={styles.name}>{user.userName}</h6>
          <p className={styles.account}>@{user.userAccount}</p>
        </div>
        )
      })
    )}
  </div>
  </div>
  );
}

export default OnlineUsers;