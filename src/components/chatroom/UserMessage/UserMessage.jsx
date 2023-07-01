import { useGetUserTweets } from '../../../context/GetUserTweets';
import { useSocketContext } from '../../../context/SocketContext';
import styles from './user.message.module.scss'
import moment from 'moment'

const UserMessage = ({ handleMessageBoxClicked }) => {
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
            const now = moment()
            const messageTime = moment(lastMessage.time)
            const diffInSeconds = now.diff(messageTime, 'seconds');
            const diffInMinutes = now.diff(messageTime, 'minutes')
            const diffInHours = now.diff(messageTime, 'hours')
            const diffInDays = now.diff(messageTime, 'days')
            const diffInYears = now.diff(messageTime, 'years')
            const date = messageTime.format('M月D日')
            const year = messageTime.format('YYYY年')

            let displayTime;
            if (diffInYears >= 1) {
              displayTime = year + date
            } else if (diffInDays >= 1) {
              displayTime = date;
            } else if (diffInHours >= 1) {
              displayTime = `${diffInHours} 小時`;
            } else if (diffInMinutes >= 1) {
              displayTime = `${diffInMinutes} 分鐘`;
            } else {
              displayTime = `${diffInSeconds} 秒`;
            }

          if (lastMessage) {
              return (
                <div className={styles.messageWrapper} key={room} data-id={receiverData.receiver.id}
                onClick={(e) => {
                  const clickedReceiverId = e.currentTarget.dataset.id
                  handleMessageBoxClicked(room, clickedReceiverId)
                }}>
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
                    <div className={styles.time}>{displayTime}</div>
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