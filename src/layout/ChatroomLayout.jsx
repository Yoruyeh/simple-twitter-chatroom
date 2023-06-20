import styles from './Layouts.module.scss'


const NotificationLayout = (props) => {
  return (
    <div className={styles.notification}>
      <div className={styles.notificationLeft}>
        {props.left}
      </div>
      <div className={styles.notificationCenter}>
        {props.center}
      </div>
      <div className={styles.notificationRight}>
        {props.right}
      </div>
    </div>
  )
}

const ChatRoomLayout = (props) => {
  return (
    <div className={styles.chatroom}>
      <div className={styles.chatroomLeft}>
        {props.left}
      </div>
      <div className={styles.chatroomCenter}>
        {props.center}
      </div>
      <div className={styles.chatroomRight}>
        {props.right}
      </div>
    </div>
  )
}

export {NotificationLayout, ChatRoomLayout}
