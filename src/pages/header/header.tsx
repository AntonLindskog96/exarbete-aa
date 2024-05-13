import React from 'react'
import homeIcon from "@/assets/images/home-icon.png";
import hamburgerMenuIcon from "@/assets/images/hamburger-menu.png";
import styles from "@/pages/header/header.module.scss";

const Header = () => {
    return (
        <div className={styles.headerContent}>
            <div className={styles.iconContent}>
                <img src={homeIcon.src} alt="icon" className={styles.icon}/>
            </div>
            <div className={styles.buttonContent}>
                <button className={styles.orderButton}>Beställ</button>
                <button className={styles.loginButton}>Logga in</button>
            </div>
            <div className={styles.hamburgerMenuContent}>
                <img src={hamburgerMenuIcon.src} className= {styles.hamburgerMenuButton} height={40} width={40} />
            </div>
            <nav id="nav">

                <ul>
                    <li>HOme</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Help</li>
                </ul>

            </nav>
        </div>


    )
}

export default Header
