import { useGetUserTweets } from '../../../context/GetUserTweets';
import { useSocketContext } from '../../../context/SocketContext';
import styles from './user.message.module.scss'

const UserMessage = () => {
  const { currentMemberInfo } = useGetUserTweets()
  const { privateMessage } = useSocketContext()
  const roomNames = Object.keys(privateMessage);

 return (
  <div className={styles.container}>
    <header><h4>訊息</h4></header>
    { roomNames && roomNames.map(room => {
        const roomMessages = privateMessage[room] || [];
        if (roomMessages.length > 0) {
            const receiverData = roomMessages.find(msg => msg.receiver.id !== currentMemberInfo.id)
            const lastMessage = roomMessages[roomMessages.length - 1];
            if (lastMessage) {
                return (
                  <div className={styles.messageWrapper} key={room}>
                    <div className={styles.messageItem} >
                      <div className={styles.info}>
                        <img src={receiverData.receiver.avatar} alt="avatar" className={styles.avatar} />
                        <div className={styles.text}>
                          <h6 className={styles.name}>{receiverData.receiver.name} 
                          <span className={styles.account}> @{receiverData.receiver.account}</span>
                          </h6>
                          <p className={styles.message}>{lastMessage.message}</p>
                        </div> 
                      </div>
                      <div className={styles.time}>6月31日</div>
                    </div>
                  </div>
                )
            }
        }
        return null;
    })}
  </div>
);
}

export default UserMessage;