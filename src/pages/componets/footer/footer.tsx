// src/components/Footer.tsx

import React from "react";
import styles from "./footer.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGooglePlusG,

  faLinkedinIn,
  faTwitter,

} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  const scrollToHome = () => {
    const home = document.getElementById("home");
    if (home) {
      home.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToAboutSection = () => {
    const aboutSection = document.getElementById("aboutSection");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToBurgerSection = () => {
    const burgerSection = document.getElementById("burgerSection");
    if (burgerSection) {
      burgerSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToWorkSection = () => {
    const workSection = document.getElementById("workSection");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <section className={styles.footerContainer}>
        <div className={styles.leftSection}>
          <ul className={styles.ul}>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faFacebookF} className={styles.icon} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faLinkedinIn} className={styles.icon} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faGooglePlusG} className={styles.icon} />
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.middleSection}>
          <h2 className={styles.footerTitle}>Pints & Pattys</h2>
        </div>

        <div className={styles.rightSection}>
          <button onClick={scrollToHome} className={styles.scrollToSection}>
            HEM
          </button>
          <button
            onClick={scrollToAboutSection}
            className={styles.scrollToSection}
          >
            OM OSS
          </button>
          <button
            onClick={scrollToBurgerSection}
            className={styles.scrollToSection}
          >
            VÅRA BURGARE
          </button>
          <button
            onClick={scrollToWorkSection}
            className={styles.scrollToSection}
          >
            JOBBA HOS OSS
          </button>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
