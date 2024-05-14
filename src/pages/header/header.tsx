import React, {useState} from 'react'
import homeIcon from "@/assets/images/home-icon.png";
import hamburgerMenuIcon from "@/assets/images/hamburger-menu.png";
import styles from "@/pages/header/header.module.scss";
import Login from "@/modules/login";


const Header: React.FC = () => {

    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    };

    const handleOpen = () => {
        setShowLoginPopup(true);
    }

    const handleClose = () => {
        setShowLoginPopup(false);
    }


    return (
        <div className={styles.headerContent}>
            <div className={styles.iconContent}>
                <img src={homeIcon.src} alt="icon" className={styles.icon}/>
            </div>
            <div className={styles.buttonContent}>
                <button className={styles.orderButton}>Beställ</button>
                <button className={styles.loginButton} onClick={handleOpen}>Logga in</button>
                {showLoginPopup && <Login open={showLoginPopup} onClose={handleClose}/>}
            </div>
            <div className={styles.hamburgericon} onClick={toggleMenu}>
            <img src={hamburgerMenuIcon.src} height={50}></img>
            </div>
            <nav id="nav">

                {/*<ul>*/}
                {/*    <li>HOme</li>*/}
                {/*    <li>About</li>*/}
                {/*    <li>Contact</li>*/}
                {/*    <li>Help</li>*/}
                {/*</ul>*/}

            </nav>
            <div className={ ` ${styles["dark-blue"]} ${isMenuOpen ? styles.slide : ""}`}></div>
            {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div> }
        </div>

    );
};

export default Header;
