import styles from './chat.room.module.scss'
import { SendIcon } from '../../../assets/icons';

const ChatRoom = () => {
  return (
   <div className={styles.container}>
      <header><h4>公開聊天室</h4></header>
      <body>
        <div className={styles.notiWrapper}>
          <div className={styles.noti}>Apple上線</div>
        </div>
        <div className={styles.otherMessageWrapper}>
          <img src="" alt="avatar" className={styles.avatar} />
          <div className={styles.otherText}>
            <div className={styles.otherMessage}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </div>
            <div className={styles.otherTime}>下午4:20</div>
          </div>
        </div>
        <div className={styles.myMessageWrapper}>
          <div className={styles.myText}>
            <div className={styles.myMessage}>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
            </div>
            <div className={styles.myTime}>下午4:22</div>
          </div>
        </div>
        <div className={styles.myMessageWrapper}>
          <div className={styles.myText}>
            <div className={styles.myMessage}>Hello 你最近好嗎？
            </div>
            <div className={styles.myTime}>下午4:22</div>
          </div>
        </div>
      </body>
      <footer>
        <form action="">
          <input className={styles.input} type="text" name="myMessage" placeholder="輸入訊息..."/>
        </form>
        <SendIcon />
      </footer>
    </div>
  );
}

export default ChatRoom;