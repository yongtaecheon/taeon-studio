import React from 'react';
import LoadEffects from "../components/loadEffects";
import styles from '../styles/lab.module.scss';

export default function Lab() {
  return (
    <div className={styles.lab}>
      <p>You can use Effects on my songs</p>
      <LoadEffects/>
    </div>
  )
}
