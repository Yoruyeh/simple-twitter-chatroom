import { useSocketContext } from '../../../context/SocketContext';
import styles from './online.user.module.scss'

const OnlineUsers = ({ isConnected }) => {
  const { joinedUsers } = useSocketContext()

  return (
  isConnected && joinedUsers && 
  <div className={styles.container}>
    <header>
      <h4>上線使用者 ({joinedUsers.length})</h4>
    </header>
    <div className={styles.userWrapper} >
      {joinedUsers.map((user) => (
        <div className={styles.userItem} key={user.id}>
          <img src={user.avatar} alt="avatar" className={styles.avatar} />
          <h6 className={styles.name}>{user.name}</h6>
          <p className={styles.account}>@{user.account}</p>
        </div>
      ))}
    </div>
  </div>
);

}

export default OnlineUsers;