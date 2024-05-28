import React, { useEffect, useRef, useState } from "react";
import styles from "./work.module.scss";
import burgerBeer from "@/assets/images/burgergif.gif";
import { motion, useAnimation } from "framer-motion";

const WorkSection = () => {
  const controls = useAnimation();
  const workSectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
          if (workSectionRef.current) {
            observer.unobserve(workSectionRef.current);
          }
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (workSectionRef.current) {
      observer.observe(workSectionRef.current);
    }

    return () => {
      if (workSectionRef.current) {
        observer.unobserve(workSectionRef.current);
      }
    };
  }, [workSectionRef]);

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
      className={styles.workSection}
      ref={workSectionRef}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 1 }}
    >
      <article className={styles.workText}>
        <h1 className={styles.workTitle}>Jobba hos oss</h1>
        <h3 className={styles.workDescription}>
          Fyll i intresseanmälan så kontaktar vi dig.
        </h3>
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
    </motion.section>
  );
};

export default WorkSection;
