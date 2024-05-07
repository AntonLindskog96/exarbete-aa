import React from 'react'
import homeIcon from "@/assets/images/home-icon.png";
import styles from "@/pages/dashboard/index.module.scss";
import {motion} from "framer-motion";

const Header = () => {
    return (
        <div>
            <img src={homeIcon.src} alt="icon" className={styles.icon}/>
            <button className={styles.headerButton}>Beställ</button>
            <button className={styles.loginButton}>Logga in</button>
        </div>
    )
}

export default Header
