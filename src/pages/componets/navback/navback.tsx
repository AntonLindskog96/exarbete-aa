import React from 'react'
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import router from 'next/router';
import styles from "./navback.module.scss";

const navback = () => {
  return (
    <button className={styles.navigateButton} onClick={() => router.back()}>
          Gå tillbaka
          <ArrowBackIosIcon sx={{ fontSize: 30 }} />
        </button>
  )
}

export default navback
