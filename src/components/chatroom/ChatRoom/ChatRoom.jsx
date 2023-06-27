import styles from './chat.room.module.scss'
import { useState } from 'react';
import { SendIcon } from '../../../assets/icons';
import { useLocation } from 'react-router-dom';
import { socket } from '../../../socket'
import { useSocketContext } from '../../../context/SocketContext';

const ChatRoom = () => {
  const pathname = useLocation().pathname
  const { messages } = useSocketContext()
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event) => {
    console.log(event)
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
        <h4>Apple</h4>
        <p>@apple</p>
      </header>
    )}
      <div className={styles.messageContainer}>
        <div className={styles.notiWrapper}>
          <div className={styles.noti}>Apple上線</div>
        </div>
        {/* <div className={styles.otherMessageWrapper}>
          <img src="" alt="avatar" className={styles.avatar} />
          <div className={styles.otherText}>
            <div className={styles.otherMessage}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </div>
            <div className={styles.otherTime}>下午4:20</div>
          </div>
        </div> */}
        {messages && messages.map((message, index) => {
          return (
            <div className={styles.myMessageWrapper} key={index}>
            <div className={styles.myText}>
            <div className={styles.myMessage}>{message}
            </div>
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
          onChange={ e => setValue(e.target.value) }/>
          <button type="submit"  disabled={ isLoading }>
            <SendIcon />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default ChatRoom;