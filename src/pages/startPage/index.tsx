import React from "react";
import { motion } from "framer-motion";
import styles from "./index.module.scss";
import Link from "next/link";
import Header from "@/pages/header/header";
import burgerPicture from "@/assets/images/burger-picture3.png";
import AboutSection from "../componets/sections/aboutSection/about";
import BurgerSection from "../componets/sections/burgerSection/burger";
import WorkSection from "../componets/sections/workSection/work";
import Footer from "../componets/footer/footer";
import burgerPicture2 from "@/assets/images/promo-burger.png";
import ReviewSection from "../componets/sections/reviewSection/review";

const StartPage = () => {
  return (
    <motion.div>
      <section id="home" className={styles.headerContainer}>
        <Header />
        <section className={styles.mainInfoPage}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className={styles.startPageTitle}>Pints & Patties</h1>
          </motion.div>
          <div className={styles.descriptionContainer}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1.5 }}
            className={styles.titleDescription}
          >
            The perfect pair...
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1.5 }}
            className={styles.titleDescription}
          >
            burger and beer
          </motion.span>
        </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 3 }}
          >
            <Link href="/orderPage">
              <button className={styles.button}>Beställ</button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 3 }}
            className={styles.scrollTextContainer}
          >
            <div className={styles.scrollTextList}>
              <div className={styles.inner}>
                <div className={styles.tag}>GÖTEBORG</div>
                <div className={styles.tag}>YSTAD</div>
                <div className={styles.tag}>KRISTIANSTAD</div>
                <div className={styles.tag}>ÅSTORP</div>
                <div className={styles.tag}>STOCKHOLM</div>
                <div className={styles.tag}>JOKKMOKK</div>
                <div className={styles.tag}>HELSINKI</div>
                <div className={styles.tag}>SKÅNE</div>
                <div className={styles.tag}>GÖTEBORG</div>
                <div className={styles.tag}>YSTAD</div>
                <div className={styles.tag}>KRISTIANSTAD</div>
                <div className={styles.tag}>ÅSTORP</div>
                <div className={styles.tag}>STOCKHOLM</div>
                <div className={styles.tag}>JOKKMOKK</div>
                <div className={styles.tag}>HELSINKI</div>
                <div className={styles.tag}>SKÅNE</div>
              </div>
            </div>
          </motion.div>
          <div className={styles.contentPicture}>
            <img
              src={burgerPicture.src}
              alt="icon"
              className={styles.burgerPicture}
            />
          </div>
        </section>
      </section>
      <AboutSection />
      <BurgerSection />
      <ReviewSection />
      <WorkSection />
      <Footer />
    </motion.div>
  );
};

export default StartPage;
