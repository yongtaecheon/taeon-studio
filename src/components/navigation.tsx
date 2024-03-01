import React from "react";
import styles from "../styles/navigation.module.scss";
import { Link, useLocation } from 'react-router-dom';


export default function Navigation() {
  const path = useLocation().pathname;
  return (
    <nav>
      <ul className={styles.ul}>
        <li className={styles.li_main}><Link to="/">Taeon Studio</Link></li>
        <li className={styles.li}><Link to="/about">About {path === '/about' ? '✔' : ''}</Link></li>
        <li className={styles.li}><Link to="/tracks">Tracks {path === '/tracks' ? '✔' : ''}</Link></li>
        <li className={styles.li}><Link to="/lab">Lab {path === '/lab' ? '✔' : ''}</Link></li>
      </ul>
    </nav>
  );
}