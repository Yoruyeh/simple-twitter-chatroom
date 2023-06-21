import styles from './chat.room.module.scss'

const ChatRoom = () => {
  return (
   <div className={styles.container}>
      <header><h4>公開聊天室</h4></header>
      <body></body>
      <footer></footer>
    </div>
  );
}

export default ChatRoom;