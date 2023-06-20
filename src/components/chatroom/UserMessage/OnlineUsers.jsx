import styles from './online.user.module.scss'

const OnlineUsers = () => {
  return (
   <div className={styles.container}>
      <header><h4>上線使用者 (5)</h4></header>

      <div className={styles.userWrapper}>
        <div className={styles.userItem}>
          <img src="" alt="avatar" className={styles.avatar} />
          <h6 className={styles.name}>Apple</h6>
          <p className={styles.account}>@apple</p>
        </div>

        <div className={styles.userItem}>
          <img src="" alt="avatar" className={styles.avatar} />
          <h6 className={styles.name}>Apple</h6>
          <p className={styles.account}>@apple</p>
        </div>

        <div className={styles.userItem}>
          <img src="" alt="avatar" className={styles.avatar} />
          <h6 className={styles.name}>Apple</h6>
          <p className={styles.account}>@apple</p>
        </div>

        <div className={styles.userItem}>
          <img src="" alt="avatar" className={styles.avatar} />
          <h6 className={styles.name}>Apple</h6>
          <p className={styles.account}>@apple</p>
        </div>
      </div>
    </div>
  );
}

export default OnlineUsers;