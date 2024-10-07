import React, { useEffect, useRef, useState } from "react";
import styles from "./review.module.scss";
import reviewPicture from "@/assets/images/aboutsection.webp";
import reviewPicture1 from "@/assets/images/review1.jpg";
import reviewPicture2 from "@/assets/images/review2.jpg";
import reviewPicture3 from "@/assets/images/review3.jpg";
import reviewPicture4 from "@/assets/images/beer.avif";
import { inView, motion, useAnimation } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

const ReviewSection = () => {
  const controls = useAnimation();
  const reviewSectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
          if (reviewSectionRef.current) {
            observer.unobserve(reviewSectionRef.current);
          }
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (reviewSectionRef.current) {
      observer.observe(reviewSectionRef.current);
    }

    return () => {
      if (reviewSectionRef.current) {
        observer.unobserve(reviewSectionRef.current);
      }
    };
  }, [reviewSectionRef]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.section
      id="reviewSection"
      className={styles.reviewSection}
      ref={reviewSectionRef}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 1 }}
    >
      <Splide aria-label="My Favorite Images" className={styles.splide}>
        <SplideSlide>
          <p className={styles.reviewText1}>
            »Mycket goda burgare. Sötpotatispommes krispiga. Väldigt alert
            personal.«
            <br /> <br />
            <em>- Edward Blom </em>
          </p>
          <p className={styles.reviewText1}></p>
          <img
            className={styles.review1}
            src={reviewPicture1.src}
            alt="Image 1"
          />
          <div className={styles.faderight}></div>
        </SplideSlide>
        <SplideSlide>
          <p className={styles.reviewText1}>
            »Verkligen en fantastisk adress! Blandningar av smaker, finess,
            mästerskap. Härlig service. Tveka inte att gå!«
            <br /> <br />
            <em>- Håkan </em>
          </p>
          <img
            className={styles.review2}
            src={reviewPicture2.src}
            alt="Image 2"
          />
          <div className={styles.faderight}></div>
        </SplideSlide>
        <SplideSlide>
          <p className={styles.reviewText1}>
            »Det här är ju sommar på riktigt!«
            <br /> <br />
            <em>- Lennart </em>
          </p>
          <img
            className={styles.review3}
            src={reviewPicture3.src}
            alt="Image 2"
          />
          <div className={styles.faderight}></div>
        </SplideSlide>
        <SplideSlide>
          <p className={styles.reviewText4}>
            »Riktigt gott, succé«
            <br /> <br />
            <em>- Anton </em>
          </p>
          <img
            className={styles.review4}
            src={reviewPicture4.src}
            alt="Image 2"
          />
          <div className={styles.fadeLeft}></div>
        </SplideSlide>
      </Splide>
    </motion.section>
  );
};

export default ReviewSection;
