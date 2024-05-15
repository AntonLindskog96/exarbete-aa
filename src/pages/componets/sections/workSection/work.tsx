import React from "react";
import styles from "./work.module.scss";
import aboutPicture from "@/assets/images/worksection.webp";

const WorkSection = () => {
  return (
    <section id="about" className={styles.workSection}>
      <article className={styles.aboutcontainer}>
        <h2 className={styles.aboutname}>JOBBA HOS OSS</h2>
        <p className={styles.homepageText}>
          I vår strävan efter den perfekta burgaren har vi inte glömt våra
          rötter från Skåne. Varje komponent är noggrant utvald för att ge en
          smakupplevelse som är lika rik som de skånska fälten. Vi har skapat en
          unik köttblandning som inte bara ger en djup köttsmak, utan också
          hyllar den robusta karaktären från Skånes landsbygd. Alltid tillverkad
          av 100% nötkött, förstås. Men låt oss inte glömma det andra viktiga -
          vårt hemlagade bröd och våra specialkomponerade såser som bär på
          smaken av Skåne. Bakom varje tugga finns en historia av kärlek och
          omsorg för smaken, en smak av både Göteborg och Skåne. På 'Pints and
          Pattys' tar vi den långa vägen till en riktigt bra produkt, där varje
          burgare är en hyllning till våra skånska rötter och en ära åt äkta
          hantverk.
        </p>
      </article>
      <img src={aboutPicture.src} alt="icon" className={styles.aboutPicture} />
    </section>
  );
};

export default WorkSection;
