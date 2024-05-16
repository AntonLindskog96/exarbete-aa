// src/components/Footer.tsx

import React from 'react';
import styles from './footer.module.scss';

const Footer: React.FC = () => {
    const scrollWin = () => {
        window.scrollTo(300, 0); 
      };
      return (
        <footer className={styles.footer}>
          <section className={styles.footerButtons}>
            {/* Add content inside the button tags */}
          </section>
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          <p>
            <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a>
          </p>
          <button onClick={scrollWin} className={styles.scrollToSection}>
            Scroll to 500 vertically!
          </button>
        </footer>
      );
    };

export default Footer;
