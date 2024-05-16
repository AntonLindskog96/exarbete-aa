// src/components/Footer.tsx

import React from 'react';
import styles from './footer.module.scss';

const Footer: React.FC = () => {
    const scrollToHome = () => {
        const home = document.getElementById('home');
        if (home) {
            home.scrollIntoView({ behavior: 'smooth' });
        }
      };
    const scrollToAboutSection = () => {
        const aboutSection = document.getElementById('aboutSection');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
      const scrollToBurgerSection = () => {
        const burgerSection = document.getElementById('burgerSection');
        if (burgerSection) {
            burgerSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
      const scrollToWorkSection = () => {
        const workSection = document.getElementById('workSection');
        if (workSection) {
            workSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

      return (
        <footer className={styles.footer}>
          <section className={styles.footerButtons}>
          </section>
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          <p>
            <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a>
          </p>
          <button onClick={scrollToAboutSection} className={styles.scrollToSection}>
            OM OSS
          </button>
          <button onClick={scrollToBurgerSection} className={styles.scrollToSection}>
             VÅRA BURGARE
          </button>
          <button onClick={scrollToWorkSection} className={styles.scrollToSection}>
            JOBBA HOS OSS
          </button>
          <button onClick={scrollToHome} className={styles.scrollToSection}>
            Hem
          </button>

        </footer>
      );
    };

export default Footer;
