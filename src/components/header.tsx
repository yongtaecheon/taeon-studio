import React from "react";
import styles from "../styles/header.module.scss";
import { Link, useLocation } from 'react-router-dom';


export default function Header() {
  const path = useLocation().pathname;
  return (
    <header className={styles.header}>
      <h1 className={styles.h1_main}><Link to="/">Taeon Studio</Link></h1>
      <nav>
        <ul className={styles.ul}>
          <li className={styles.li}><Link to="/about">About {path === '/about' ? '✔' : ''}</Link></li>
          <li className={styles.li}><Link to="/tracks">Tracks {path === '/tracks' ? '✔' : ''}</Link></li>
          <li className={styles.li}><Link to="/lab">Lab {path === '/lab' ? '✔' : ''}</Link></li>
        </ul>
      </nav>
    </header>
  );
}