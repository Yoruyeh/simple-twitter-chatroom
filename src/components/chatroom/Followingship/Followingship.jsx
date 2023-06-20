import styles from './followingship.module.scss'
import { FollowButton } from '../../common/button.styled'

const Followingship = () => {
  return (
   <div className={styles.container}>
    <header><h4>跟隨誰</h4></header>
    <div className={styles.followWrapper}>
      <div className={styles.followItem}>
        <div className={styles.info}>
          <img src="" alt="avatar" className={styles.avatar} />
          <div className="text">
          <h6 className={styles.name}>Pizza Hut</h6>
          <p className={styles.account}>@pizzahut</p>
          </div>
        </div>
        <div className={styles.button}><FollowButton /></div>
      </div>
    </div>
   </div>
  );
}

export default Followingship;