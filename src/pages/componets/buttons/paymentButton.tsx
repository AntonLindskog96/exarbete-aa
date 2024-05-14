import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./buttons.module.scss";

interface Props {
  rounded: any; 
}

const CheckoutButton: React.FC<Props> = ({ rounded }) => {
  return (
    <div className={styles.checkoutButtonSection}>
      <Link href="/checkoutPage">
        <motion.div>
          <motion.button
            className={styles.checkoutButton}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Till Betalning <motion.span>{rounded}</motion.span> SEK
          </motion.button>
        </motion.div>
      </Link>
    </div>
  );
};

export default CheckoutButton;
