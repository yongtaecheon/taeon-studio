import React from "react";
import styles from "../styles/header.module.scss";
import { Link, useLocation } from 'react-router-dom';


export default function Header() {
  const path = useLocation().pathname;
  return (
    <header className={styles.header}>
      <h1 className={styles.name}><Link to="/">Taeon Studio</Link></h1>
      <nav>
        <ul className={styles.ul}>
          <li className={styles.li}><Link className={`${styles.li_link} ${path==='/about'?`${styles.active}`:''}`} to="/about">About</Link></li>
          <li className={styles.li}><Link className={`${styles.li_link} ${path==='/tracks'?`${styles.active}`:''}`} to="/tracks">Tracks</Link></li>
          <li className={styles.li}><Link className={`${styles.li_link} ${path==='/lab'?`${styles.active}`:''}`} to="/lab">Lab</Link></li>
        </ul>
      </nav>
    </header>
  );
}