
import React from 'react'
import { motion } from 'framer-motion';
import styles from "./index.module.scss";

const startPage = () => {
    return (
    <motion.div>
        <div className={styles.headerContainer}>
        <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className='header1'
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
          </motion.div>
        </div>
    </motion.div>
      );
    };

export default startPage;