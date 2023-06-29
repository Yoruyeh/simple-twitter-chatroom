import { useSocketContext } from '../../../context/SocketContext';
import styles from './user.message.module.scss'

const UserMessage = () => {
  const { chatPartners } = useSocketContext()

  return (
   <div className={styles.container}>
      <header><h4>訊息</h4></header>

      <div className={styles.messageWrapper}>
        {chatPartners && chatPartners.map(partner => {
          return (
            <div className={styles.messageItem} key={partner.id}>
            <div className={styles.info}>
            <img src={partner.avatar} alt="avatar" className={styles.avatar} />
            <div className={styles.text}>
              <h6 className={styles.name}>{partner.name} 
              <span className={styles.account}> @{partner.account}</span>
              </h6>
              <p className={styles.message}>12313454fd8f4dsf45d4f4ds56f413454fd8f4dsf45d4f4</p>
             </div> 
          </div>
          <div className={styles.time}>6月31日</div>
        </div>
          )
        })}
          {/* <div className={styles.messageItem}>
          <div className={styles.info}>
            <img src="" alt="avatar" className={styles.avatar} />
            <div className={styles.text}>
              <h6 className={styles.name}>Pizza Hut 
              <span className={styles.account}> @pizzahut</span>
              </h6>
              <p className={styles.message}>12313454fd8f4dsf45d4f4ds56f413454fd8ffd8f4dsf45d4f4ds56f413454fd8f4d4dsf45d4f4</p>
             </div> 
          </div>
          <div className={styles.time}>6月31日</div>
        </div> */}
      </div>
    </div>
  );
}

export default UserMessage;