import styles from './chat.room.module.scss'
import { useState } from 'react';
import { SendIcon } from '../../../assets/icons';
import { socket } from '../../../socket'
import { useSocketContext } from '../../../context/SocketContext';
import { useGetUserTweets } from '../../../context/GetUserTweets';

const PrivateChatRoom = ({ userInfo }) => {
  const { currentMemberInfo } = useGetUserTweets()
  const { privateMessage } = useSocketContext()
  const [value, setValue] = useState('');
  const roomName = `Room-${[currentMemberInfo.id, userInfo.id].sort().join('-')}`;
  const roomMessages = privateMessage[roomName] || [];

  const onSubmit = (event) => {
    event.preventDefault(); // 避免submit預設重刷頁面
    socket.emit('private-message', { userInfo, value }); // 發出'private-message'事件，傳入input value
    setValue('') // 清空input
  }

  return (
   <div className={styles.container}>
      <header>
        <h4>{userInfo.name}</h4>
        <p>@{userInfo.account}</p>
      </header>
      <div className={styles.messageContainer}>
         {roomMessages && roomMessages.map((message) => {
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

export default PrivateChatRoom;