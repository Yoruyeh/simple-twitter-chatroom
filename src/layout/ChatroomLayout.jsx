import styles from './Layouts.module.scss'

const ChatRoom = (props) => {
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


const Notification = (props) => {
  return (
    <div className={styles.Notification}>
      <div className={styles['Notification-left']}>
        {props.left}
      </div>
      <div className={styles['Notification-center']}>
        {props.center}
      </div>
      <div className={styles['Notification-right']}>
        {props.right}
      </div>
    </div>
  )
}

export {Notification, ChatRoom}
