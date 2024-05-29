import React, { useEffect, useRef, useState } from "react";
import styles from "./about.module.scss";
import aboutPicture from "@/assets/images/aboutsection.png";
import { inView, motion, useAnimation } from "framer-motion";

const AboutSection = () => {
  const controls = useAnimation();
  const aboutSectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
          if (aboutSectionRef.current) {
            observer.unobserve(aboutSectionRef.current);
          }
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) {
        observer.unobserve(aboutSectionRef.current);
      }
    };
  }, [aboutSectionRef]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.section
      id="aboutSection"
      className={styles.aboutSection}
      ref={aboutSectionRef}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 1 }}
    >
      <article className={styles.aboutText}>
        <h2 className={styles.aboutname}>OM OSS</h2>
        <p className={styles.homepageText}>
          Från skånska vidder till göteborgska gränder - två skåningar med öl i
          ådrorna och burgare i tankarna bestämde sig för att krydda upp
          Göteborgs street food-scen.
          <br /> <br /> Välkommen till 'Pints and Patties', där våra burgare är
          saftigare än en sommardag på Skanör-stranden och vårt ölutbud är
          vildare än en midsommarfest i Malmö. Kom och upplev skånsk charm i
          varje tugga och en twist av göteborgskt äventyr i varje klunk!
        </p>
      </article>
      <motion.img
        src={aboutPicture.src}
        alt="icon"
        className={styles.aboutPicture}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1 }}
      />
    </motion.section>
  );
};

export default AboutSection;
