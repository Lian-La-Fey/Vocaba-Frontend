import React from "react";
import { FaGithub } from "react-icons/fa";
import styles from "./styles.module.css";

const Footer = () => {
  return (
    <footer className={`container-fluid ${styles.footerContainer}`}>
      <span>All Rights Reserved &copy; 2022</span>
      <a href="https://github.com/Lian-La-Fey/" className={styles.link}>
        <FaGithub />
      </a>
    </footer>
  );
};

export default Footer;
