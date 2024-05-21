import React, {useState} from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./buttons.module.scss";
import Checkout from "@/modules/checkout/checkout";

interface Props {
  rounded: any; 
}



const CheckoutButton: React.FC<Props> = ({ rounded }) => {


  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);

  const handleOpen = () => {
    setShowCheckoutPopup(true);
  }

  const handleClose = () => {
    setShowCheckoutPopup(false);
  }



  return (
    <div className={styles.checkoutButtonSection}>
        <motion.div>
          <motion.button
            className={styles.checkoutButton}
            onClick={handleOpen}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Till Betalning <motion.span>{rounded}</motion.span> SEK
          </motion.button>{showCheckoutPopup && <Checkout open={showCheckoutPopup} onClose={handleClose}/>}
        </motion.div>
    </div>
  );
};

export default CheckoutButton;
