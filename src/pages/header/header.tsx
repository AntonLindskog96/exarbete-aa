import React from 'react'
import homeIcon from "@/assets/images/home-icon.png";
import styles from "@/pages/dashboard/index.module.scss";

const Header = () => {
    return (
        <div className={styles.headerContent}>
            <div className={styles.iconContent}>
                <img src={homeIcon.src} alt="icon" className={styles.icon}/>
            </div>
            <div className={styles.buttonContent}>
                <button className={styles.headerButton}>Beställ</button>
                <button className={styles.loginButton}>Logga in</button>
            </div>
        </div>
    )
}

export default Header
