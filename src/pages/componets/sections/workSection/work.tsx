import React from "react";
import styles from "./work.module.scss";
import burgerBeer from "@/assets/images/burgergif.gif";

const WorkSection = () => {
  return (
    <section id="workSection" className={styles.workSection}>
      <article className={styles.workText}>
        <h1 className={styles.workTitle}>Jobba hos oss</h1>
        <h3 className={styles.workDescription}>Fyll i intresseanmälan så kontaktar vi dig.</h3>
        <form className={styles.formStyling}>
        <label>
        Email:
        <input className={styles.input} type="text" name="username" />
      </label>
        <label>
        Namn:
        <input className={styles.input} type="text" name="name" />
      </label>
      <label>
        Telefon:
        <input className={styles.input} type="text" name="name" />
      </label>
      <label>
        Meddelande:
        <input className={styles.input} type="text" name="name" />
      </label>
        <button className={styles.workButton}> SKICKA</button>
        </form>
      </article>
      <img src={burgerBeer.src} alt="icon" className={styles.workPicture} />
    </section>
  );
};

export default WorkSection;
