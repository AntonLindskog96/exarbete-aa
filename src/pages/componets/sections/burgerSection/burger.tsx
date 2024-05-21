import React from "react";
import styles from "./burger.module.scss";
import burgerPicture from "@/assets/images/burgersection.webp";

const BurgerSection = () => {
  return (
    <section id="burgerSection" className={styles.burgerSection}>
      <img src={burgerPicture.src} alt="icon" className={styles.burgerPicture} />
      <article className={styles.burgerText}>
        <h2 className={styles.burgerTitle}>Våra Burgare</h2>
        <p className={styles.homepageText}>
          I vår strävan efter den perfekta burgaren har vi inte glömt våra
          rötter från Skåne. Varje komponent är noggrant utvald för att ge en
          smakupplevelse som är lika rik som de skånska fälten. Vi har skapat en
          unik köttblandning som inte bara ger en djup köttsmak, utan också
          hyllar den robusta karaktären från Skånes landsbygd. <br /> <br /> Alltid tillverkad
          av 100% nötkött, förstås. Men låt oss inte glömma det andra viktiga -
          vårt hemlagade bröd och våra specialkomponerade såser som bär på
          smaken av Skåne. Bakom varje tugga finns en historia av kärlek och
          omsorg för smaken, en smak av både Göteborg och Skåne. På 'Pints and
          Pattys' tar vi den långa vägen till en riktigt bra produkt, där varje
          burgare är en hyllning till våra skånska rötter och en ära åt äkta
          hantverk.
        </p>
      </article>
    </section>
  );
};

export default BurgerSection;
