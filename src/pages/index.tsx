import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import StartPage from "./dashboard";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <StartPage />
      </main>
    </>
  );
}
