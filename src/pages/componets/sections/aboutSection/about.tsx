import React from 'react'
import styles from "./about.module.scss";
import aboutPicture from "@/assets/images/aboutsection.webp";

const AboutSection = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <article>
        <h2 className={styles.aboutname}>OM OSS</h2>
        <p className={styles.homepageText}>
          Från skånska vidder till göteborgska gränder - två skåningar med öl i
          ådrorna och burgare i tankarna bestämde sig för att krydda upp
          Göteborgs street food-scen.<br/> <br/> Välkommen till 'Pints and Pattys', där
          våra burgare är saftigare än en sommardag på Skanör-stranden och vårt
          ölutbud är vildare än en midsommarfest i Malmö. Kom och upplev skånsk
          charm i varje tugga och en twist av göteborgskt äventyr i varje klunk!
        </p>
        </article>
        <img
          src={aboutPicture.src}
          alt="icon"
          className={styles.aboutPicture}
        />
      </section>
  )
}

export default AboutSection;
