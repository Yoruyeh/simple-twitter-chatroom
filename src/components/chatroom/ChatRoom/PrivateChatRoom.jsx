import styles from './chat.room.module.scss'
import { useState } from 'react';
import { SendIcon } from '../../../assets/icons';
import { socket } from '../../../socket'
import { useSocketContext } from '../../../context/SocketContext';

const PrivateChatRoom = ({ userInfo }) => {
  const { privateMyMsg, privateOtherMsg } = useSocketContext()
  const [value, setValue] = useState('');

  const onSubmit = (event) => {
    event.preventDefault(); // 避免submit預設重刷頁面
    const receiverId = userInfo.id
    socket.emit('private-message', { receiverId, value }); // 發出'create-message'事件，傳入input value
    setValue('') // 清空input
  }


  return (
   <div className={styles.container}>
      <header>
        <h4>{userInfo.name}</h4>
        <p>@{userInfo.account}</p>
      </header>
      <div className={styles.messageContainer}>
        {privateOtherMsg && privateOtherMsg.map((message, index) => {
          return (
            <div className={styles.otherMessageWrapper} key={index}>
            <img src={message.sender.userAvatar} alt="avatar" className={styles.avatar} />
            <div className={styles.otherText}>
            <div className={styles.otherMessage}>{message.message}</div>
            <div className={styles.otherTime}>下午4:20</div>
          </div>
        </div>
          )
        })}
        {privateMyMsg && privateMyMsg.map((message, index) => {
          return (
            <div className={styles.myMessageWrapper} key={index}>
            <div className={styles.myText}>
            <div className={styles.myMessage}>{message.message}</div>
            <div className={styles.myTime}>下午4:22</div>
          </div>
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

export default PrivateChatRoom;