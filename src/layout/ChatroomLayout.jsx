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
    <div className={styles.ChatRoom}>
      <div className="ChatRoom-left">
        {props.left}
      </div>
      <div className="ChatRoom-center">
        {props.center}
      </div>
      <div className="ChatRoom-right">
        {props.right}
      </div>
    </div>
  )
}

export {NotificationLayout, ChatRoomLayout}
