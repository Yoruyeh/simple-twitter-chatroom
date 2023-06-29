import styles from './chat.room.module.scss'
import { useState } from 'react';
import { SendIcon } from '../../../assets/icons';
import { useLocation } from 'react-router-dom';
import { socket } from '../../../socket'
import { useSocketContext } from '../../../context/SocketContext';
import { useGetUserTweets } from '../../../context/GetUserTweets';

const PublicChatRoom = () => {
  const pathname = useLocation().pathname
  const { myMessages, otherMessages, joinedUsers, leftUsers } = useSocketContext()
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {currentMemberInfo} = useGetUserTweets()

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true)

    socket.timeout(100).emit('create-message', value, () => {
    setValue('')
    setIsLoading(false);
    });
  }

  return (
   <div className={styles.container}>
    {pathname.includes('public') ? (
      <header>
        <h4>公開聊天室</h4>
      </header>
    ) : (
      <header>
        <h4>{currentMemberInfo.name}</h4>
        <p>@{currentMemberInfo.account}</p>
      </header>
    )}
      <div className={styles.messageContainer}>
        {joinedUsers && joinedUsers.map((user) => {
            return (
              <div className={styles.notiWrapper} key={user.userId}>
                <div className={styles.noti}>{user.userName}上線</div>
              </div>
            )
          })}
          {leftUsers && leftUsers.map((user) => {
            return (
              <div className={styles.notiWrapper} key={user.userId}>
                <div className={styles.noti}>{user.userName}離線</div>
              </div>
            )
          })}
        {otherMessages && otherMessages.map((message, index) => {
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
        {myMessages && myMessages.map((message, index) => {
          return (
            <div className={styles.myMessageWrapper} key={index}>
            <div className={styles.myText}>
            <div className={styles.myMessage}>{message.message}</div>
            <div className={styles.myTime}>下午4:22</div>
          </div>
        </div>
          )
        })}
        {/* <div className={styles.myMessageWrapper}>
          <div className={styles.myText}>
            <div className={styles.myMessage}>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
            </div>
            <div className={styles.myTime}>下午4:22</div>
          </div>
        </div> */}
        {/* <div className={styles.myMessageWrapper}>
          <div className={styles.myText}>
            <div className={styles.myMessage}>Hello 你最近好嗎？
            </div>
            <div className={styles.myTime}>下午4:22</div>
          </div>
        </div> */}
      </div>
      <footer>
        <form onSubmit={onSubmit}>
          <input className={styles.input} type="text" name="myMessage" 
          value={value}
          placeholder="輸入訊息..."
          onChange={ e => setValue(e.target.value) }/>
          <button type="submit"  disabled={ isLoading }>
            <SendIcon />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default PublicChatRoom;