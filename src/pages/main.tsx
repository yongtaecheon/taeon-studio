import React from 'react';
import styles from '../styles/main.module.scss';

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.texts}>
        <h1 className={styles.texts_h1}>Taeon Studio</h1>
        <span>this is taeon's music studio.</span>
      </div>
    </div>
  )
}
