import React, {useEffect, useState} from 'react'
import homeIcon from "@/assets/images/home-icon.png";
import hamburgerMenuIcon from "@/assets/images/hamburger-menu.png";
import styles from "@/pages/header/header.module.scss";
import Login from "@/modules/login";


const Header: React.FC = () => {

    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    };

    const handleOpen = () => {
        setShowLoginPopup(true);
    }

    const handleClose = () => {
        setShowLoginPopup(false);
    }

    const handleLogout = () => {

        localStorage.removeItem("currentUser");
        setLoggedInUser(null);

    }

    useEffect(() => {

        const currentUserString = localStorage.getItem("currentUser");
        if (currentUserString) {
            const currentUser = JSON.parse(currentUserString);
            setLoggedInUser(currentUser.email);
        } else {
            setLoggedInUser(null);
        }
    }, [showLoginPopup]);


    return (
        <div className={styles.headerContent}>
            <div className={styles.iconContent}>
                <img src={homeIcon.src} alt="icon" className={styles.icon}/>
            </div>
            <div className={styles.buttonContent}>
                {loggedInUser && (
                    <p className={styles.loggedInText}>Inloggad som {loggedInUser}</p>
                )}
                <button className={styles.orderButton}>Beställ</button>
                {!loggedInUser ? (
                    <button className={styles.loginButton} onClick={handleOpen}>Logga in</button>
                ) : (
                    <button className={styles.logoutButton} onClick={handleLogout}>Logga ut</button>
                )}
                {showLoginPopup && <Login open={showLoginPopup} onClose={handleClose}/>}
            </div>
            <div className={styles.hamburgericon} onClick={toggleMenu}>
                <img src={hamburgerMenuIcon.src}></img>
            </div>
            <nav id="nav">

                {/*<ul>*/}
                {/*    <li>HOme</li>*/}
                {/*    <li>About</li>*/}
                {/*    <li>Contact</li>*/}
                {/*    <li>Help</li>*/}
                {/*</ul>*/}

            </nav>
            <div className={` ${styles["dark-blue"]} ${isMenuOpen ? styles.slide : ""}`}></div>
            {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
        </div>

    );
};

export default Header;
