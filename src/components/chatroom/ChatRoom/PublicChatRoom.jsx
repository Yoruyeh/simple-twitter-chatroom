import styles from './chat.room.module.scss'
import { useState } from 'react';
import { SendIcon } from '../../../assets/icons';
import { socket } from '../../../socket'
import { useSocketContext } from '../../../context/SocketContext';
import { useGetUserTweets } from '../../../context/GetUserTweets';

const PublicChatRoom = ({ isConnected }) => {
  const { currentMemberInfo } = useGetUserTweets()
  const { messages, joinedUsers, leftUsers } = useSocketContext()
  const [value, setValue] = useState('');

  // 監聽form的sumbit事件
  const onSubmit = (event) => {
    event.preventDefault(); // 避免submit預設重刷頁面
    socket.emit('create-message', value); // 發出'create-message'事件，傳入input value
    setValue('') // 清空input
  }

  return (
    isConnected &&
   <div className={styles.container}>
      <header>
        <h4>公開聊天室</h4>
      </header>
      <div className={styles.messageContainer}>
        {joinedUsers && joinedUsers.map((user) => {
            return (
              <div className={styles.notiWrapper} key={user.id}>
                <div className={styles.noti}>{user.name}上線</div>
              </div>
            )
          })}
          {messages && messages.map((message) => {
            if(message.sender.id === currentMemberInfo.id) {
              return (
                <div className={styles.myMessageWrapper} key={message.message}>
                <div className={styles.myText}>
                  <div className={styles.myMessage}>{message.message}</div>
                  <div className={styles.myTime}>下午4:22</div>
                </div>
                </div>
              )
            } else {
              return (
                <div className={styles.otherMessageWrapper} key={message.message}>
                <img src={message.sender.avatar} alt="avatar" className={styles.avatar} />
                <div className={styles.otherText}>
                  <div className={styles.otherMessage}>{message.message}</div>
                  <div className={styles.otherTime}>下午4:20</div>
                </div>
                </div>
              )
            }
          })}
          {leftUsers && leftUsers.map((user) => {
            return (
              <div className={styles.notiWrapper} key={user.id}>
                <div className={styles.noti}>{user.name}離線</div>
              </div>
            )
          })}
      </div>
      <footer>
        <form onSubmit={onSubmit}>
          <input className={styles.input} type="text" name="myMessage" 
          value={value}
          placeholder="輸入訊息..."
          onChange={ e => setValue(e.target.value) }/>
          <button type="submit">
            <SendIcon />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default PublicChatRoom;