import { useAuth } from '../../../context/AuthContext';
import styles from './online.user.module.scss'

const OnlineUsers = ({ isConnected }) => {
  const {currentMember} = useAuth()

  return (
  <div className={styles.container}>
  <header>
    <h4>上線使用者 (5)</h4>
  </header>
  {isConnected && currentMember && (
    <div className={styles.userWrapper}>
      <div className={styles.userItem}>
        <img src={currentMember.avatar} alt="avatar" className={styles.avatar} />
        <h6 className={styles.name}>{currentMember.name}</h6>
        <p className={styles.account}>@{currentMember.account}</p>
      </div>
    </div>
  )}
</div>
  );
}

export default OnlineUsers;