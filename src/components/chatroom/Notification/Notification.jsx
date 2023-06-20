import styles from './notification.module.scss'

const Notification = () => {
  return (
    <div className={styles.container}>
      <header><h4>通知</h4></header>

      <div className={styles.notiWrapper}>
        <div className={styles.notiItem}>
          <img src="" alt="avatar" className={styles.avatar} />
          <h6 className={styles.title}>John有新的推文通知</h6>
          <p className={styles.content}>123112313213</p>
        </div>

        <div className={styles.notiItem}>
          <img src="" alt="avatar" className={styles.avatar} />
          <h6 className={styles.title}>你的貼文有新的回覆</h6>
          <p className={styles.content}>123112313213123112313213123112313213123112313213123112313213123112313213123112313213123112313213123112313213</p>
        </div>
        <div className={styles.notiItem}>
          <img src="" alt="avatar" className={styles.avatar} />
          <h6 className={styles.title}>John有新的推文通知</h6>
          <p className={styles.content}>123112313213</p>
        </div>

        <div className={styles.notiItem}>
          <img src="" alt="avatar" className={styles.avatar} />
          <h6 className={styles.title}>你的貼文有新的回覆</h6>
          <p className={styles.content}>123112313213123112313213123112313213123112313213123112313213123112313213123112313213123112313213123112313213</p>
        </div>
        <div className={styles.notiItem}>
          <img src="" alt="avatar" className={styles.avatar} />
          <h6 className={styles.title}>John有新的推文通知</h6>
          <p className={styles.content}>123112313213</p>
        </div>

        <div className={styles.notiItem}>
          <img src="" alt="avatar" className={styles.avatar} />
          <h6 className={styles.title}>你的貼文有新的回覆</h6>
          <p className={styles.content}>123112313213123112313213123112313213123112313213123112313213123112313213123112313213123112313213123112313213</p>
        </div>
        <div className={styles.notiItem}>
          <img src="" alt="avatar" className={styles.avatar} />
          <h6 className={styles.title}>John有新的推文通知</h6>
          <p className={styles.content}>123112313213</p>
        </div>

        <div className={styles.notiItem}>
          <img src="" alt="avatar" className={styles.avatar} />
          <h6 className={styles.title}>你的貼文有新的回覆</h6>
          <p className={styles.content}>123112313213123112313213123112313213123112313213123112313213123112313213123112313213123112313213123112313213</p>
        </div>

      </div>
    </div>
  );
}

export default Notification;