import React from "react";
import styles from "./styles/homepage.module.scss";
import Navbar from "../components/Navbar";
const HomePage = ({ lang }) => {
  return (
    <main className={styles.container}>
      <Navbar lang={lang} location="home" />

      <h1>HomePage {lang.id}</h1>
    </main>
  );
};

export default HomePage;
