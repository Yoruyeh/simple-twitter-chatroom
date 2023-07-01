import styles from './chat.room.module.scss'
import { useState } from 'react';
import { SendIcon } from '../../../assets/icons';
import { socket } from '../../../socket'
import { useSocketContext } from '../../../context/SocketContext';
import { useGetUserTweets } from '../../../context/GetUserTweets';
import moment from 'moment'

const PrivateChatRoom = ({ userInfo,currentRoom }) => {
  const { currentMemberInfo } = useGetUserTweets()
  const { privateMessage } = useSocketContext()
  const [value, setValue] = useState('');
  const roomName = currentRoom || `Room-${[currentMemberInfo.id, userInfo.id].sort().join('-')}`;
  const roomMessages = privateMessage[roomName] || [];

  const onSubmit = (event) => {
    event.preventDefault(); // 避免submit預設重刷頁面
    const now = moment();
    socket.emit('private-message', { userInfo, value, now }); // 發出'private-message'事件，傳入input value
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
            const now = moment()
            const messageTime = moment(message.time)
            const diffInMinutes = now.diff(messageTime, 'minutes')
            const diffInDays = now.diff(messageTime, 'days')
            const diffInYears = now.diff(messageTime, 'years')
            const period = messageTime.format('A') === 'AM' ? '上午' : '下午';
            const time = messageTime.format('h:mm')
            const date = messageTime.format('M月D日')
            const year = messageTime.format('YYYY年')
            if(message.sender.id === currentMemberInfo.id) {
              return (
                <div className={styles.myMessageWrapper} key={message.message}>
                <div className={styles.myText}>
                  <div className={styles.myMessage}>{message.message}</div>
                  <div className={styles.myTime}>
                    {diffInYears === 0 ? '' : year}
                    {diffInDays === 0 ? '' : date}
                    {diffInMinutes === 0 ? '剛剛' : ' ' + period + time}
                  </div>
                </div>
                </div>
              )
            } else {
              return (
                <div className={styles.otherMessageWrapper} key={message.message}>
                <img src={message.sender.avatar} alt="avatar" className={styles.avatar} />
                <div className={styles.otherText}>
                  <div className={styles.otherMessage}>{message.message}</div>
                  <div className={styles.otherTime}>
                    {diffInYears === 0 ? '' : year}
                    {diffInDays === 0 ? '' : date}
                    {diffInMinutes === 0 ? '剛剛' : ' ' + period + time}
                  </div>
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