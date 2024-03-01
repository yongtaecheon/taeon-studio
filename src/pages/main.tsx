import React from 'react';
import styles from '../styles/main.module.scss';
import { useNavigate } from 'react-router-dom';


export default function Main() {
  // const path = useLocation().pathname;
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <div className={styles.texts}>
        <h1 className={styles.texts_h1}>Taeon Studio</h1>
        <span>this is taeon's music studio. <br/>this studio has songs covered and arranged by me. <br/>You can access the various audio effects on Lab.</span>
      </div>
      <div className={styles.overlay}>
        <div className={styles.nav}>
          <h1 onClick={() => navigate('/about')}>About</h1>
          <h1 onClick={() => navigate('/tracks')}>Tracks</h1>
          <h1 onClick={() => navigate('/about')}>Lab</h1>
        </div>
      </div>
    </div>
  )
}
