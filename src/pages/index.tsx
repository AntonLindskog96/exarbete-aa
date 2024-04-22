import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Dashboard from "./dashboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard page" />
      </Head>
      <main className={styles.main}>
        <Dashboard />
      </main>
    </>
  );
}
