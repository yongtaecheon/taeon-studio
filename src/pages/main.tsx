import React from 'react';
import styles from '../styles/main.module.scss';
import { useNavigate } from 'react-router-dom';


export default function Main() {
  // const path = useLocation().pathname;
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <div className={styles.overlay}>
        <div className={styles.nav}>
          <span className={styles.nav_items} onClick={() => navigate('/about')}>About</span>
          <span className={styles.nav_items} onClick={() => navigate('/tracks')}>Tracks</span>
          <span className={styles.nav_items} onClick={() => navigate('/lab')}>Lab</span>
        </div>
      </div>
      <div className={styles.textbox}>
        <div className={styles.texts}>
          <h1 className={styles.texts_h1}>Taeon Studio</h1>
          <span>this is taeon's music studio. <br/>this studio has songs covered and arranged by me. <br/>You can access the various audio effects on Lab.</span>
        </div>
      </div>
    </div>
  )
}
