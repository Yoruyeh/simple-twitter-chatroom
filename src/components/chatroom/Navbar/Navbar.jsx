import { OutlinedHome, OutlinedNoti2, OutlinedMessage, OutlinedChat, OutlinedUser, OutlinedCog, OutlinedLogout, Logo } from "../../../assets/icons";
import styles from './navbar.module.scss'
import { NavbarButton } from "../../common/button.styled";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Navbar = ({ handleOpenTweetModal }) => {
  const {logout} = useAuth()
  
  return (
   <nav className={styles.navContainer}>
    <div className={styles.iconLogo}><Logo /></div>
    <ul className={styles.navList}>
      <li className={styles.navItem}>
        <NavLink to='/home' activeclassname="active">
        <div className={styles.icon}><OutlinedHome /></div>
        <h5 className={styles.text}>首頁</h5>
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to='/noti' activeclassname="active">
        <div className={styles.icon}><OutlinedNoti2 /></div>
        <h5 className={styles.text}>通知</h5>
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to='/public' activeclassname="active">
        <div className={styles.icon}><OutlinedChat /></div>
        <h5 className={styles.text}>公開聊天室</h5>
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to='/:id/message' activeclassname="active">
        <div className={styles.icon}><OutlinedMessage /></div>
        <h5 className={styles.text}>私人訊息</h5>
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to='/:id' activeclassname="active">
        <div className={styles.icon}><OutlinedUser /></div>
        <h5 className={styles.text}>個人資料</h5>
        </NavLink>
      </li> 
      <li className={styles.navItem}>
        <NavLink to='/setting' activeclassname="active">
        <div className={styles.icon}><OutlinedCog /></div>
        <h5 className={styles.text}>設定</h5>
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to='/login' activeclassname="active" 
        onClick={() => {
          logout()
          localStorage.removeItem('activeNavItem')
          localStorage.removeItem('userInfo')
          }}>
        <div className={styles.icon}><OutlinedLogout /></div>
        <h5 className={styles.text}>登出</h5>
        </NavLink>
      </li>
    </ul>
    <NavbarButton className={styles.navTweetButton} onClick={handleOpenTweetModal}>推文</NavbarButton>
   </nav>
  );
}

export default Navbar;


