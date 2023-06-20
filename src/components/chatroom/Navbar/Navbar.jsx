import { OutlinedHome, OutlinedNoti2, OutlinedMessage, OutlinedChat, OutlinedUser, OutlinedCog, OutlinedLogout, Logo } from "../../../assets/icons";
import styles from './navbar.module.scss'

const Navbar = () => {
  return (
   <nav className={styles.navContainer}>
    <div className={styles.iconLogo}><Logo /></div>
    <ul className={styles.navList}>
      <li className={styles.navItem}>
        <div className={styles.icon}><OutlinedHome /></div>
        <h5 className={styles.text}>首頁</h5>
      </li>
      <li className={styles.navItem}>
        <div className={styles.icon}><OutlinedNoti2 /></div>
        <h5 className={styles.text}>通知</h5>
      </li>
      <li className={styles.navItem}>
        <div className={styles.icon}><OutlinedChat /></div>
        <h5 className={styles.text}>公開聊天室</h5>
      </li>
      <li className={styles.navItem}>
        <div className={styles.icon}><OutlinedMessage /></div>
        <h5 className={styles.text}>私人訊息</h5>
      </li>
      <li className={styles.navItem}>
        <div className={styles.icon}><OutlinedUser /></div>
        <h5 className={styles.text}>個人資料</h5>
      </li>
      <li className={styles.navItem}>
        <div className={styles.icon}><OutlinedCog /></div>
        <h5 className={styles.text}>設定</h5>
      </li>
      <li className={styles.navItem}>
        <div className={styles.icon}><OutlinedLogout /></div>
        <h5 className={styles.text}>登出</h5>
      </li>
    </ul>
   </nav>
  );
}

export default Navbar;


