import React from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.scss';

const StartPage = () => {
  return (
    <motion.div>
      <div className={styles.headerContainer}>
        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className={styles.header1}
        >
          <h1>Pints & Pattys</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.8, duration: 3 }}
          className={styles.header1}
        >
          <h2>The perfect pair, burger and beer</h2>
          <button className={styles.button}>Beställ</button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 2.5, duration: 3 }}
          className={styles.scrollTextContainer}
        >
          <ul className={styles.scrollTextList}>
            <li>Göteborg </li>
            <li>Åstorp </li>
            <li>Ystad </li>
            <li>Kristiandstad </li>
            <li>Skåne </li>
            <li>Göteborg </li>
            <li>Åstorp </li>
            <li>Ystad </li>
            <li>Kristiandstad </li>
            <li>Skåne </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StartPage;
